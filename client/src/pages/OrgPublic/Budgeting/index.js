import GeneralPaddingSection from '../../../components/Layout/GeneralPaddingSection';
import {
  Typography as T,
  Grid,
  GoBack,
  HelpfulResources,
  PageHeader,
  Cards,
  StillNeedHelp,
} from '../../../components';
import { usePublicOrg } from '../../../context/public-org';

import * as S from './style';

const { Row, Col } = Grid;
const { SingleTip } = Cards;
const BudgetingPage = () => {
  const { publicOrg } = usePublicOrg();

  return (
    <S.Container>
      <PageHeader
        title="**Budgeting**"
        textColor="secondaryMain"
        bgColor="neutralLight"
        borderColor="white"
      />
      <GeneralPaddingSection>
        <Row mb="6">
          <Col w={[4, 8, 6]}>
            <T.P color="neutralDark">
              Doing a budget to work out how much money you have coming in and
              going out is a great place to start. There are many budgeting
              tools available to help you do this, however a debt advisor or a
              money advisor will be able to help you if you find it difficult to
              do on your own.
            </T.P>
          </Col>
        </Row>
        <Row mb="4">
          <Col w={[4, 12, 12]}>
            <T.H2 color="neutralMain">Here are our top tips</T.H2>
          </Col>
        </Row>
        {/* first tip */}
        <Row mb="3">
          <Col w={[4, 8, 6]}>
            <SingleTip
              bgColor="secondaryMain"
              borderColor="white"
              iconColor="white"
              tip={
                <div>
                  <T.H3 color="white">Tip!</T.H3>
                  <S.TipList ml="5" color="white">
                    <li>
                      <T.H3 color="white">
                        When doing your budget be as honest and accurate as
                        possible.
                      </T.H3>
                    </li>
                    <li>
                      <T.H3 color="white">
                        Put down what you actually spend, as opposed to what you
                        think you should or could spend.{' '}
                      </T.H3>
                    </li>
                    <li>
                      <T.H3 color="white">
                        By creating an accurate budget you get the best possible
                        starting point for making the most of your money,
                        talking to creditors, or getting money or debt advice.
                      </T.H3>
                    </li>
                  </S.TipList>
                </div>
              }
            />
          </Col>
        </Row>

        {/* second tip */}
        <Row mb="6">
          <Col w={[4, 8, 6]}>
            <SingleTip
              bgColor="secondaryLight"
              borderColor="secondaryMain"
              iconColor="secondaryMain"
              tip={
                <div>
                  <T.H3 color="secondaryMain">Tip!</T.H3>
                  <S.TipList ml="5" color="secondaryMain">
                    <li>
                      <T.H3 color="secondaryMain">
                        Most budgets are done for a calendar month; keep this in
                        mind when adding your income and outgoings. For example,
                        to work out the monthly sum for something you pay weekly
                        you will need to multiply the sum by 52 (weeks), then
                        divide by 12 (months).
                      </T.H3>
                    </li>
                    <li>
                      <T.H3 color="secondaryMain">
                        A budget tool will do this for you automatically.
                      </T.H3>
                    </li>
                  </S.TipList>
                </div>
              }
            />
          </Col>
        </Row>
        <Row mb="6">
          <Col w={[4, 8, 6]}>
            <HelpfulResources
              resources={publicOrg?.resources?.filter(
                (r) => r.category === 'BUDGET'
              )}
            />
          </Col>
        </Row>
        <Row mb="4">
          <Col w={[4, 8, 6]}>
            <StillNeedHelp phoneNumber={'0800 138 7777'} />
          </Col>
        </Row>
        <Row mt="4" mb="5">
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

export default BudgetingPage;
