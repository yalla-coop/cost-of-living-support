import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../../helpers';
import { message } from 'antd';
import { navRoutes, common } from '../../../constants';
import { generatePath } from 'react-router-dom';
import { Sections } from '../../../api-calls';
import { usePublicOrg } from '../../../context/public-org';
import {
  Cards,
  Typography as T,
  TextWithIcon,
  Grid,
  Button,
  Image,
} from '../../../components';
import LandingContent from './LandingContent';
import HelpButton from '../../../components/HelpButton';
import * as S from './style';

const { Col, Row } = Grid;

const Home = () => {
  const { i18n, t } = useTranslation();
  const { lng } = useLanguage();
  const [stuck, setStuck] = useState(false);
  const [cardsData, setCardsData] = useState([]);
  const { publicOrg } = usePublicOrg();
  const uniqueSlug = publicOrg?.uniqueSlug;

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      const hideMessage = message.loading('Loading...');
      const { data, error } = await Sections.getSections({
        uniqueSlug,
        forPublic: true,
        lng,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueSlug, lng]);
  i18n.addResourceBundle(lng, 'cardsDataNS', {
    cardsData,
  });
  const _cardsData = t('cardsData', { ns: 'cardsDataNS', returnObjects: true });

  return (
    <S.Container>
      <LandingContent />
      <S.Section>
        <S.CardsWrapper>
          {_cardsData.map((item) => {
            return (
              <Cards.SectionCard
                key={item.id}
                id={item.id}
                text={item.title.replace(/\*/g, '')}
                to={
                  item.hasSubSections
                    ? generatePath(navRoutes.PUBLIC_ORG.SUBSECTIONS, {
                        uniqueSlug,
                        id: item.id,
                      })
                    : generatePath(navRoutes.PUBLIC_ORG.SECTION, {
                        uniqueSlug,
                        id: item.id,
                      })
                }
                themeKey={item.themeKey}
                mb={2}
                mbM={'0'}
              />
            );
          })}
        </S.CardsWrapper>
      </S.Section>
      <S.FullSection>
        <S.NeedHelpWrapper>
          <T.H2 color="neutralMain" ta="center" taM="start" mb="4">
            {t(
              'common.section.helpBudget.title',
              common.section.helpBudget.title
            )}
          </T.H2>

          <S.ReadMoreLink
            to={generatePath(navRoutes.PUBLIC_ORG.BUDGETING, {
              uniqueSlug,
            })}
          >
            <TextWithIcon
              size="large"
              text={t('common.buttons.readMore', common.buttons.readMore)}
              bgColor="neutralLight"
              jc="center"
              jcT="flex-start"
              mr="6px"
              isText
              iconProps={{
                color: 'tertiaryDark',
                icon: 'forwardArrow',
              }}
            />
          </S.ReadMoreLink>
        </S.NeedHelpWrapper>
      </S.FullSection>
      <Row jc="center" jcM="flex-start">
        <Col w={[4, 6, 4]} jc="center" jcM="flex-start" mt="8" mtM="6" mb="0">
          <S.ButtonsContainer>
            <T.H2 ta="center" taM="start" color="neutralMain" mb="4">
              {t(
                'common.section.stressedOrOverwhelmed.title',
                common.section.stressedOrOverwhelmed.title
              )}
            </T.H2>
            <Button
              variant="primary"
              text={t('common.buttons.seeAdvice', common.buttons.seeAdvice)}
              mb="6"
              to={generatePath(navRoutes.PUBLIC_ORG.MENTAL_HEALTH, {
                uniqueSlug,
              })}
            />
            <TextWithIcon
              text={t(
                'common.buttons.stuckTalkToSomeOne',
                common.buttons.stuckTalkToSomeOne
              )}
              isButton
              handleClick={() => setStuck(true)}
              underline
              weight="medium"
              mr="3"
              jc="center"
              iconProps={{
                color: 'primaryMain',
                icon: 'forwardArrow',
              }}
            />
          </S.ButtonsContainer>
        </Col>
      </Row>
      <HelpButton parentState={stuck} parentFunc={() => setStuck(false)} />
      <Image
        image="mayorOfLondon"
        width={'300px'}
        customStyle={{ paddingTop: '40px' }}
      />
    </S.Container>
  );
};

export default Home;
