import * as Sections from '../use-cases';

const createSection = async (req, res, next) => {
  try {
    const { title, topics, themeKey } = req.body;
    const { id: userId, organisationId: userOrganisationId } = req.user;

    const section = await Sections.createSection({
      title,
      userId,
      topics,
      themeKey,
      userOrganisationId,
    });

    res.json(section);
  } catch (error) {
    next(error);
  }
};

export default createSection;
