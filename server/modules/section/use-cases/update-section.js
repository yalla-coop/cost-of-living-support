import Boom from '@hapi/boom';
import * as Sections from '../model';
import { getClient } from '../../../database/connect';
import { errorMsgs } from '../../../services/error-handler';

const updateSection = async ({
  id,
  title,
  userId,
  topics,
  userOrganisationId,
}) => {
  const topicIdsToUpdate = topics
    .filter((t) => !t.new)
    .map((t) => ({ ...t, new: undefined }));
  const newTopics = topics.filter((t) => t.new);

  // check if the user is the owner of the section
  const sectionOrg = await Sections.findSectionWithOrgId({
    sectionId: id,
    organisationId: userOrganisationId,
  });

  if (!sectionOrg) {
    throw Boom.badImplementation(errorMsgs.NOT_FOUND); // send error 500 to get in sentry
  }

  // check if the topic ids are correct
  topicIdsToUpdate.forEach((t) => {
    if (!sectionOrg.topicsIds.includes(t.id)) {
      throw Boom.badImplementation(errorMsgs.NOT_FOUND); // send error 500 to get in sentry
    }
  });

  const client = await getClient();
  try {
    await client.query('BEGIN');

    const section = await Sections.updateSection(
      { id, title, updatedBy: userId },
      client,
    );

    await Sections.deleteTopicsBySectionId(
      { sectionId: id, topicIdsToKeep: topicIdsToUpdate.map((t) => t.id) },
      client,
    );

    await Sections.createTopics({ sectionId: id, topics: newTopics }, client);

    await Promise.all(
      topicIdsToUpdate.map((t) =>
        Sections.updateTopicById({ id: t.id, content: t }, client),
      ),
    );

    await client.query('COMMIT');
    return section;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default updateSection;