import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GeneralPaddingSection from '../../../components/Layout/GeneralPaddingSection';

import PageHeader from '../../../components/PageHeader';
import * as S from './style';
import { Sections } from '../../../api-calls';
import { usePublicOrg } from '../../../context/public-org';
import { TopicCard } from '../../../components/Cards';
import useTopics from './useTopics';
import StillNeedHelp from '../../../components/StillNeedHelp';

const Section = () => {
  const { publicOrg } = usePublicOrg();
  const { id } = useParams();

  const [sectionData, setSectionData] = useState({});
  const { topics, toggleMark } = useTopics(id, publicOrg?.resources);

  useEffect(() => {
    const fetchSectionData = async () => {
      const { data, error } = await Sections.getSectionById({
        id,
      });
      if (error) {
        // message.error('Something went wrong, please try again later');
      } else {
        setSectionData(data);
      }
    };

    fetchSectionData();
  }, [id]);

  const { title, parentSectionTitle } = sectionData;
  const pageTitle = parentSectionTitle
    ? `${parentSectionTitle.replace(/\*\*/g, '')} **${title}**`
    : title;

  return (
    <S.Container>
      <PageHeader title={pageTitle} />
      <GeneralPaddingSection>
        <S.Content>
          <S.Topics>
            {topics.map(({ id, marked, content }, i) => (
              <TopicCard
                topicIndex={i}
                key={id}
                title={content.title}
                description={content.content}
                tips={[content.tip1, content.tip2]}
                toggleMark={() => toggleMark(id)}
                marked={marked}
                resources={content.resources}
              />
            ))}
          </S.Topics>
          <S.HelpSection>
            <StillNeedHelp />
          </S.HelpSection>
        </S.Content>
      </GeneralPaddingSection>
    </S.Container>
  );
};

export default Section;
