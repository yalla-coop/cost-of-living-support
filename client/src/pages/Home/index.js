import { useState, useEffect, useRef } from 'react';

import Step from '../../components/Steps';
import { Typography as T } from '../../components';
import { t } from '../../helpers';
import { useLang } from '../../context/lang';
import { useSteps } from '../../context/steps';
import { navRoutes as n } from '../../constants';
import LandingContent from './LandingContent';

import Icon from '../../components/Icon';
import HelpButton from '../../components/HelpButton';
import TextWithIcon from '../../components/TextWithIcon';

import * as S from './style';

const afterClaimContent = {
  title: {
    completed: 'You’re all done!',
    notCompleted: `What should I do once I am granted Universal Credit?`,
  },
  text: {
    completed: `Got your Universal Credit? Great news! Check out these steps on what to do next:`,
    notCompleted: `Once you’ve completed your claim there are few additional steps you can take. Open this when you’re completed the above steps`,
  },
};

const Home = () => {
  const { lang } = useLang();
  const {
    steps,
    justCompletedId,
    setJustCompletedId,
    loadingSteps,
    stepsObj,
  } = useSteps();

  const [showAfterClaim, setShowAfterClaim] = useState(false);

  const currentStep = steps.find((step) => !step.isCompleted);
  const currentStepRef = useRef();

  const completedClaim = currentStep?.stage === 'afterClaiming';

  const getStepStatus = (step, i) => {
    const isCurrentStep = currentStep && step.name === currentStep.name;
    const variant = step.isCompleted
      ? 'neutral'
      : isCurrentStep
      ? 'primary'
      : 'secondary';
    const isJustCompletedOne = step.id === justCompletedId;
    // To only add ref to the currentStep
    let currentRef = isCurrentStep ? currentStepRef : null;
    if (i === steps.length - 1 && step.isCompleted) {
      currentRef = currentStepRef;
    }

    return { variant, currentRef, isJustCompletedOne, isCurrentStep };
  };

  useEffect(() => {
    if (currentStepRef.current && justCompletedId) {
      currentStepRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [justCompletedId]);

  return (
    <>
      <LandingContent />

      {/* BEFORE CLAIMING */}
      {stepsObj.BEFORE_CLAIMING?.map((step, i) => {
        const { variant, currentRef, isJustCompletedOne } = getStepStatus(
          step,
          i
        );

        return (
          <Step
            key={step.id}
            title={step.title}
            description={step.description}
            content={t(`${step.name}.subtitle`, lang)}
            isCompleted={step.isCompleted}
            variant={variant}
            direction={i % 2 === 0 ? 'left' : 'right'}
            mt="7"
            isJustCompletedOne={isJustCompletedOne}
            to={n.STEPS.STEP.replace(':id', step.id)}
            ref={currentRef}
            isOptional={step.isOptional}
            handleClick={() => {
              setJustCompletedId('');
            }}
            loadingSteps={loadingSteps}
          />
        );
      })}

      {/* CLAIMING */}
      {stepsObj.CLAIMING?.map((step, i) => {
        const { variant, currentRef, isJustCompletedOne } = getStepStatus(
          step,
          i
        );

        return (
          <Step
            key={step.id}
            title={step.title}
            description={step.description}
            content={t(`${step.name}.subtitle`, lang)}
            isCompleted={step.isCompleted}
            variant={variant}
            direction={i % 2 === 0 ? 'left' : 'right'}
            mt="7"
            isJustCompletedOne={isJustCompletedOne}
            to={n.STEPS.STEP.replace(':id', step.id)}
            ref={currentRef}
            isOptional={step.isOptional}
            handleClick={() => {
              setJustCompletedId('');
            }}
            loadingSteps={loadingSteps}
          />
        );
      })}

      {/* AFTER CLAIMING */}
      <S.Section mt="7">
        <Icon icon="flag" mt="6" mb="5" mbM="0" mtM="5" />
        <T.H2 color="neutralMain" mb="1">
          {
            afterClaimContent.title[
              completedClaim ? 'completed' : 'notCompleted'
            ]
          }
        </T.H2>
        <S.StyledText>
          {
            afterClaimContent.text[
              completedClaim ? 'completed' : 'notCompleted'
            ]
          }
        </S.StyledText>
        {!completedClaim && !showAfterClaim && (
          <S.Container mt="4">
            <TextWithIcon
              icon="bulletArrow"
              iconColor="primaryMain"
              isButton
              handleClick={() => setShowAfterClaim(true)}
              text="View steps"
              jc="flex-start"
              weight="500"
            />
          </S.Container>
        )}
      </S.Section>

      {(completedClaim || showAfterClaim) &&
        stepsObj.AFTER_CLAIMING?.map((step, i) => {
          const { variant, currentRef, isJustCompletedOne } = getStepStatus(
            step,
            i
          );

          return (
            <Step
              key={step.id}
              title={step.title}
              description={step.description}
              content={t(`${step.name}.subtitle`, lang)}
              isCompleted={step.isCompleted}
              variant={variant}
              direction={i % 2 === 0 ? 'left' : 'right'}
              mt="7"
              isJustCompletedOne={isJustCompletedOne}
              to={n.STEPS.STEP.replace(':id', step.id)}
              ref={currentRef}
              isOptional={step.isOptional}
              handleClick={() => {
                setJustCompletedId('');
              }}
              loadingSteps={loadingSteps}
            />
          );
        })}
      <HelpButton />
    </>
  );
};

export default Home;
