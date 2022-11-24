import * as S from './style';
import { Row } from '../../Grid';
import { TextWithIcon } from '../../../components';
import { useMediaQuery } from 'react-responsive';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
import { types } from '../../../constants';

const props = {
  weight: 'medium',
  mr: 2,
  isButton: true,
  iconColor: 'neutralMain',
};

const Desktop = ({ dir, showBack, largeText, handleHide, flag, langFull }) => {
  const LTR = (
    <Row>
      <S.DesktopWrapper>
        <S.ButtonWrapper>
          {showBack && (
            <TextWithIcon icon="backArrow" iconColor="neutralMain" isButton />
          )}
          <TextWithIcon
            handleClick={() => null}
            text="Accessibility"
            icon="accessibility"
            {...props}
          />
          <TextWithIcon
            handleClick={() => null}
            text={largeText ? '- Decrease text size' : '+ Increase text size'}
            icon="textSize"
            {...props}
          />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <TextWithIcon
            handleClick={handleHide}
            text={langFull}
            icon={flag}
            {...props}
          />
        </S.ButtonWrapper>
      </S.DesktopWrapper>
    </Row>
  );

  const RTL = (
    <S.DesktopWrapper>
      <S.ButtonWrapper>
        <TextWithIcon
          handleClick={handleHide}
          text={langFull}
          icon={flag}
          {...props}
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <TextWithIcon
          handleClick={() => null}
          text={largeText ? '- Decrease text size' : '+ Increase text size'}
          icon="textSize"
          {...props}
        />
        <TextWithIcon
          handleClick={() => null}
          text="نموذج"
          icon="accessibility"
          {...props}
        />
        {showBack && (
          <TextWithIcon icon="backArrowRTL" iconColor="neutralMain" isButton />
        )}
      </S.ButtonWrapper>
    </S.DesktopWrapper>
  );

  return dir === 'rtl' ? RTL : LTR;
};

const Tablet = ({ dir, showBack, handleHide, flag, langCode }) => {
  const LTR = (
    <S.TabletWrapperLTR showBack={showBack}>
      {showBack && (
        <TextWithIcon icon="backArrow" iconColor="neutralMain" isButton />
      )}
      <S.ButtonWrapper>
        <TextWithIcon
          handleClick={() => null}
          text="Accessibility"
          icon="accessibility"
          {...props}
        />
        <TextWithIcon handleClick={() => null} icon="textSize" {...props} />
        <TextWithIcon
          handleClick={handleHide}
          text={langCode}
          icon={flag}
          {...props}
        />
      </S.ButtonWrapper>
    </S.TabletWrapperLTR>
  );

  const RTL = (
    <S.TabletWrapperRTL showBack={showBack}>
      <S.ButtonWrapper>
        <TextWithIcon
          handleClick={handleHide}
          text={langCode}
          icon={flag}
          {...props}
        />
        <TextWithIcon handleClick={() => null} icon="textSize" {...props} />
        <TextWithIcon
          text="نموذج"
          handleClick={() => null}
          icon="accessibility"
          {...props}
        />
      </S.ButtonWrapper>
      {showBack && (
        <TextWithIcon icon="backArrowRTL" iconColor="neutralMain" isButton />
      )}
    </S.TabletWrapperRTL>
  );

  return dir === 'rtl' ? RTL : LTR;
};

export const LanguageBar = ({ dir, largeText, showBack, handleHide }) => {
  const { i18n } = useTranslation();
  const { language: langCode } = i18n;

  const langFull = Object.keys(types.languageCodes).find(
    (key) => types.languageCodes[key] === langCode
  );

  const flag = langFull.charAt(0).toLowerCase() + langFull.slice(1);

  const props = {
    dir,
    largeText,
    showBack,
    handleHide,
    flag,
    langFull,
    langCode,
  };

  const isTablet = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.tablet})`,
  });
  return isTablet ? <Tablet {...props} /> : <Desktop {...props} />;
};
