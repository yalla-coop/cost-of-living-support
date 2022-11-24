import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import { Sections } from '../../api-calls';
import { navRoutes, common } from '../../constants';
import {
  Cards,
  Typography as T,
  TextWithIcon,
  Grid,
  Button,
} from '../../components';
import LandingContent from './LandingContent';
import HelpButton from '../../components/HelpButton';
import * as S from './style';
const { Col, Row } = Grid;

const Home = () => {
  const { t } = useTranslation();
  const [stuck, setStuck] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const { uniqueSlug } = useParams();

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const hideMessage = message.loading('Loading...');
      const { data, error } = await Sections.getSections({
        uniqueSlug,
        forPublic: true,
      });
      if (mounted) {
        if (error) {
          message.error('Something went wrong, please try again later');
        } else {
          setCardsData(data);
        }
        hideMessage();
      }
    }

    fetchData();
    return () => {
      mounted = false;
    };
  }, [uniqueSlug]);

  return (
    <S.Container>
      <LandingContent />
      <S.Section>
        <S.CardsWrapper>
          {cardsData.map((item) => {
            return (
              <Cards.SectionCard
                key={item.id}
                id={item.id}
                text={item.title.replaceAll('*', '')}
                to={
                  item.hasSubSections
                    ? navRoutes.GENERAL.SUBSECTIONS.replace(':id', item.id)
                    : navRoutes.GENERAL.SECTION.replace(':id', item.id)
                }
                mb={2}
                mbM={'0'}
              />
            );
          })}
        </S.CardsWrapper>
      </S.Section>
      <S.FullSection>
        <S.NeedHelpWrapper>
          <T.H2 color="neutralMain" ta="center" taM="left">
            {t(
              'common.section.helpBudget.title',
              common.section.helpBudget.title
            )}
          </T.H2>
          <T.P ta="center" mt="4" mb="3" taM="left" color="neutralDark">
            {t(
              'common.section.helpBudget.description',
              common.section.helpBudget.description
            )}
          </T.P>
          <S.ReadMoreLink to={navRoutes.GENERAL.BUDGETING}>
            <TextWithIcon
              size="large"
              bgColor="neutralLight"
              text={t('common.buttons.readMore', common.buttons.readMore)}
              icon="forwardArrow"
              iconColor="tertiaryDark"
              jc="center"
              jcT="flex-start"
              mr="6px"
              isText
            />
          </S.ReadMoreLink>
        </S.NeedHelpWrapper>
      </S.FullSection>
      <Row jc="center" jcM="flex-start">
        <Col w={[4, 6, 4]} jc="center" jcM="flex-start" mt="8" mtM="6" mb="0">
          <S.ButtonsContainer>
            <T.H2
              id="buttons_text"
              ta="center"
              taM="left"
              color="neutralMain"
              mb="4"
            >
              {t(
                'common.section.stressedOrOverwhelmed.title',
                common.section.stressedOrOverwhelmed.title
              )}
            </T.H2>
            <Button
              variant="primary"
              text={t('common.buttons.seeAdvice', common.buttons.seeAdvice)}
              mb="6"
              to={
                uniqueSlug
                  ? navRoutes.GENERAL.MENTAL_HEALTH_ORG.replace(
                      ':uniqueSlug',
                      uniqueSlug
                    )
                  : navRoutes.GENERAL.MENTAL_HEALTH
              }
            />
            <TextWithIcon
              text={t(
                'common.buttons.stuckTalkToSomeOne',
                common.buttons.stuckTalkToSomeOne
              )}
              isButton
              handleClick={() => setStuck(true)}
              underline
              iconColor="primaryMain"
              weight="medium"
              mr="3"
              jc="center"
            />
          </S.ButtonsContainer>
        </Col>
      </Row>

      <HelpButton parentState={stuck} parentFunc={() => setStuck(false)} />
    </S.Container>
  );
};

export default Home;
