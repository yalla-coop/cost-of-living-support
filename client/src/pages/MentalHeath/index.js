import GeneralPaddingSection from '../../components/Layout/GeneralPaddingSection';
import { Typography as T, Grid, GoBack } from '../../components';
import PageHeader from '../../components/PageHeader';
import HelpfulResources from '../../components/HelpfulResources';

import * as S from './style';

const { Row, Col } = Grid;

const MentalHeath = () => {
  return (
    <S.Container>
      <PageHeader
        title="**Mental Health Support**"
        textColor="neutralMain"
        bgColor="tertiaryMain"
        borderColor="neutralMain"
      />
      <GeneralPaddingSection>
        <Row>
          <Col w={[4, 8, 6]}>
            <T.P color="neutralDark">
              Worrying about money can affect your mental health. Taking action,
              like using this tool, is a good first step. However if you're
              feeling overwhelmed, support is out there. Many people are feeling
              the same way.
            </T.P>
          </Col>
        </Row>
        <Row mt="6" mb="5">
          <Col w={[4, 8, 6]}>
            <HelpfulResources
              resources={[
                {
                  label: 'Mental Health & Money Advice',
                  link: 'https://www.mentalhealthandmoneyadvice.org/en/how-can-we-help/advice-for-someone-whos-mental-health-is-being-affected-by-money/',
                },
                {
                  label: 'Mind Information & Support',
                  link: 'https://www.mind.org.uk/information-support/tips-for-everyday-living/money-and-mental-health/',
                },
                {
                  label: 'NHS Every Mind Matters',
                  link: 'https://www.nhs.uk/every-mind-matters/',
                },
              ]}
            />
          </Col>
        </Row>
        <Row mb="4">
          <Col w={[4, 8, 6]}>
            <T.P color="neutralDark">
              If you feel you need to speak to someone right now the Samaritans
              offer a free 24h confidential listening service. You can talk to
              them about anything that is upsetting or worrying you.
              <br />
              <br />
              Samaritans Helpline:
              <T.Link weight="bold" external href={`tel:116123`} underline>
                116 123
              </T.Link>
              (Monday to Sunday at any time)
            </T.P>
          </Col>
        </Row>
        <Row mt="4" mb="7">
          <Col w={[4, 8, 6]}>
            <GoBack
              text="Go back"
              icon="backwardArrow"
              iconColor="primaryMain"
            />
          </Col>
        </Row>
      </GeneralPaddingSection>
    </S.Container>
  );
};

export default MentalHeath;
