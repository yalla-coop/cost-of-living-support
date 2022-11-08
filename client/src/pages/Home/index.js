import { useState, useEffect } from 'react';
import { message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { Sections } from '../../api-calls';
import {
  Cards,
  Typography as T,
  TextWithIcon,
  Grid,
  Button,
} from '../../components';
import { navRoutes as n } from '../../constants';
import LandingContent from './LandingContent';

import HelpButton from '../../components/HelpButton';

import * as S from './style';
const { Col, Row } = Grid;

// const cardsData = [
//   { cardId: 1, text: 'Paying for housing', to: '/' },
//   { cardId: 2, text: 'Paying for my bills', to: '/' },
//   {
//     cardId: 3,
//     text: 'Paying for essentials (Food, transport, medication)',
//     to: '/',
//   },
//   { cardId: 4, text: 'Dealing with debts', to: '/' },
//   { cardId: 5, text: 'How to maximise my income', to: '/' },
// ];

const NewHome = () => {
  const [stuck, setStuck] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  const { org } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (org) {
      navigate(n.GENERAL.HOME_ORG.replace(':org', org));
    }
  }, [org, navigate]);
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      const hideMessage = message.loading('Loading...');
      const { data, error } = await Sections.getSections({});
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
  }, []);

  return (
    <S.Container>
      <LandingContent />
      <S.Section>
        <S.CardsWrapper>
          {cardsData.map((item) => {
            return (
              <Cards.SectionCard
                key={item.cardId}
                cardId={item.cardId}
                text={item.text}
                to={item.to} // still to do decide if its route or sub-route
                mb={5}
                mbT={4}
              />
            );
          })}
        </S.CardsWrapper>
      </S.Section>
      <S.FullSection>
        <S.NeedHelpWrapper>
          <T.H2 color="neutralMain" ta="center" taM="left">
            Need help with budgeting?
          </T.H2>
          <T.P ta="center" mt="4" mb="3" taM="left" color="neutralDark">
            You know how much is going in and out but if you need a hand, we can
            help you work it out.
          </T.P>
          <TextWithIcon
            size="large"
            bgColor="neutralLight"
            to="/"
            text="Read more"
            icon="forwardArrow"
            iconColor="tertiaryDark"
            jc="center"
            jcT="flex-start"
          />
        </S.NeedHelpWrapper>
      </S.FullSection>
      <Row jc="center" jcM="flex-start">
        <Col w={[4, 6, 4]} jc="center" jcM="flex-start" mt="8" mtM="6" mb="5">
          <S.ButtonsContainer>
            <T.H2
              id="buttons_text"
              ta="center"
              taM="left"
              color="neutralMain"
              mb="4"
            >
              Feeling stressed or overwhelmed
            </T.H2>
            <Button variant="primary" text="See advice" mb="6" />
            <TextWithIcon
              text="Stuck? Talk to someone"
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

export default NewHome;
