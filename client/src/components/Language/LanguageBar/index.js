import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../../../context/accessibility';
import * as S from './style';
import { Row } from '../../Grid';
import { TextWithIcon } from '../../../components';
import { useMediaQuery } from 'react-responsive';
import theme from '../../../theme';
import { useLanguage } from '../../../helpers';
import * as R from '../../../constants/nav-routes';
import { useTranslation } from 'react-i18next';
import { common } from '../../../constants';

const props = {
  weight: 'medium',
  mr: 2,
  isButton: true,
  iconColor: 'neutralMain',
};

const Desktop = ({
  dir,
  handleHide,
  showBack,
  flag,
  lngFull,
  accessibility,
  increaseTextSize,
  decreaseTextSize,
}) => {
  const navigate = useNavigate();
  const { isFontLarge, setIsFontLarge } = useAccessibility();
  const goBack = () => {
    navigate(-1);
  };

  const LTR = (
    <Row>
      <S.DesktopWrapper>
        <S.ButtonWrapper>
          {showBack && (
            <TextWithIcon
              handleClick={goBack}
              isButton
              iconProps={{
                color: 'neutralMain',
                icon: 'backArrow',
                pointer: true,
              }}
            />
          )}

          <TextWithIcon
            handleClick={() => {
              if (!isFontLarge) {
                document.getElementsByTagName('html')[0].style.fontSize =
                  '1.25rem';
                localStorage.setItem('isFontLarge', 'true');
                setIsFontLarge(true);
              } else {
                document.getElementsByTagName('html')[0].style.fontSize =
                  '1rem';
                localStorage.removeItem('isFontLarge');
                setIsFontLarge(false);
              }
            }}
            text={isFontLarge ? decreaseTextSize : increaseTextSize}
            iconProps={{
              icon: 'textSize',
            }}
            {...props}
          />
          <TextWithIcon
            to={R.GENERAL.ACCESSIBILITY}
            text={accessibility}
            iconProps={{
              icon: 'accessibility',
            }}
            {...props}
            isButton={false}
            isText
          />
        </S.ButtonWrapper>
        <S.ButtonWrapper>
          <TextWithIcon
            handleClick={handleHide}
            text={lngFull}
            iconProps={{
              icon: flag,
              followLangDirection: false,
            }}
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
          text={lngFull}
          iconProps={{
            icon: flag,
            followLangDirection: false,
          }}
          {...props}
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        <TextWithIcon
          handleClick={() => {
            if (!isFontLarge) {
              document.getElementsByTagName('html')[0].style.fontSize =
                '1.25rem';
              localStorage.setItem('isFontLarge', 'true');
              setIsFontLarge(true);
            } else {
              document.getElementsByTagName('html')[0].style.fontSize = '1rem';
              localStorage.removeItem('isFontLarge');
              setIsFontLarge(false);
            }
          }}
          text={isFontLarge ? decreaseTextSize : increaseTextSize}
          iconProps={{
            icon: 'textSize',
          }}
          {...props}
        />
        <TextWithIcon
          handleClick={() => navigate(R.GENERAL.ACCESSIBILITY)}
          text={accessibility}
          iconProps={{
            icon: 'accessibility',
          }}
          {...props}
        />
        {showBack && (
          <TextWithIcon
            handleClick={goBack}
            iconProps={{
              color: 'neutralMain',
              icon: 'backArrowRTL',
              pointer: true,
            }}
            isButton
          />
        )}
      </S.ButtonWrapper>
    </S.DesktopWrapper>
  );

  return dir === 'rtl' ? RTL : LTR;
};

const Tablet = ({ dir, showBack, handleHide, flag, lng, accessibility }) => {
  const navigate = useNavigate();
  const { isFontLarge, setIsFontLarge } = useAccessibility();
  const goBack = () => {
    navigate(-1);
  };
  const LTR = (
    <S.TabletWrapperLTR showBack={showBack}>
      {showBack && (
        <TextWithIcon
          handleClick={goBack}
          isButton
          iconProps={{
            color: 'neutralMain',
            icon: 'backArrow',
            pointer: true,
          }}
        />
      )}
      <S.ButtonWrapper>
        <TextWithIcon
          handleClick={() => navigate(R.GENERAL.ACCESSIBILITY)}
          text={accessibility}
          iconProps={{
            icon: 'accessibility',
          }}
          {...props}
        />
        <TextWithIcon
          handleClick={() => {
            if (!isFontLarge) {
              document.getElementsByTagName('html')[0].style.fontSize =
                '1.25rem';
              localStorage.setItem('isFontLarge', 'true');
              setIsFontLarge(true);
            } else {
              document.getElementsByTagName('html')[0].style.fontSize = '1rem';
              localStorage.removeItem('isFontLarge');
              setIsFontLarge(false);
            }
          }}
          iconProps={{
            icon: 'textSize',
          }}
          {...props}
        />
        <TextWithIcon
          handleClick={handleHide}
          text={lng}
          iconProps={{
            icon: flag,
            followLangDirection: false,
          }}
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
          text={lng}
          iconProps={{
            icon: flag,
            followLangDirection: false,
          }}
          {...props}
        />
        <TextWithIcon
          handleClick={() => {
            if (!isFontLarge) {
              document.getElementsByTagName('html')[0].style.fontSize =
                '1.25rem';
              localStorage.setItem('isFontLarge', 'true');
              setIsFontLarge(true);
            } else {
              document.getElementsByTagName('html')[0].style.fontSize = '1rem';
              localStorage.removeItem('isFontLarge');
              setIsFontLarge(false);
            }
          }}
          iconProps={{
            icon: 'textSize',
          }}
          {...props}
        />
        <TextWithIcon
          dir={dir}
          text={accessibility}
          handleClick={() => navigate(R.GENERAL.ACCESSIBILITY)}
          iconProps={{
            icon: 'accessibility',
          }}
          {...props}
        />
      </S.ButtonWrapper>
      {showBack && (
        <TextWithIcon
          handleClick={goBack}
          iconProps={{
            color: 'neutralMain',
            icon: 'backArrowRTL',
            pointer: true,
          }}
          isButton
        />
      )}
    </S.TabletWrapperRTL>
  );

  return dir === 'rtl' ? RTL : LTR;
};

export const LanguageBar = ({ largeText, handleHide, showBack }) => {
  const { t } = useTranslation();

  const accessibility = t(
    'common.buttons.accessibility',
    common.buttons.accessibility
  );
  const increaseTextSize = t(
    'common.buttons.increaseTextSize',
    common.buttons.increaseTextSize
  );
  const decreaseTextSize = t(
    'common.buttons.decreaseTextSize',
    common.buttons.decreaseTextSize
  );

  const { lngFull, lngUpperCase, flag, dir } = useLanguage();

  const props = {
    dir,
    largeText,
    showBack,
    handleHide,
    flag,
    lngFull,
    lng: lngUpperCase,
    accessibility,
    increaseTextSize,
    decreaseTextSize,
  };

  const isTablet = useMediaQuery({
    query: `(max-width: ${theme.breakpoints.tablet})`,
  });

  return isTablet ? <Tablet {...props} /> : <Desktop {...props} />;
};
