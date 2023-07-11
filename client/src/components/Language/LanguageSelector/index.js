import { useState } from 'react';
import { TextWithIcon, Icon } from '../../../components';
import { FlagMap } from '../../../components/Icon';
import { BasicInput } from '../../Inputs/index';
import * as S from './style';
import { useMediaQuery } from 'react-responsive';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
import { types, common } from '../../../constants';
import ReactGA from 'react-ga4';

const props = {
  weight: 'medium',
  mr: 2,
  isButton: true,
};

export const LanguageSelector = ({ hide, handleHide }) => {
  const { i18n, t } = useTranslation();
  const [search, setSearch] = useState('');

  const sliceTo =
    useMediaQuery({
      query: `(max-width: ${theme.breakpoints.tablet})`,
    }) === true
      ? 12
      : types.languageCodes.length;

  const languages = Object.entries(types.languageCodes).filter(
    ([lng, code]) => {
      return (
        code.toLowerCase().includes(search.toLowerCase()) ||
        lng.toLowerCase().includes(search.toLowerCase())
      );
    }
  );

  const changeLanguage = ({ lng }) => {
    i18n.changeLanguage(types.languageCodes[lng]);

    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Language',
        action: 'change_language',
        label: lng,
      });
    }

    handleHide();
  };

  const Selector = (
    <S.Wrapper onClick={handleHide}>
      <S.ButtonWrapper onClick={(e) => e.stopPropagation()}>
        <BasicInput
          handleChange={(val) => setSearch(val)}
          label={t(
            'common.section.changeLanguage.title',
            common.section.changeLanguage.title
          )}
          value={search}
          name="search-language"
          placeholder={t(
            'common.section.changeLanguage.placeholder',
            common.section.changeLanguage.placeholder
          )}
          suffix={<Icon icon="search" color="neutralMain" />}
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        {languages
          .map(([lng, code]) => {
            return (
              <S.Button onClick={() => changeLanguage({ lng })} key={code}>
                <TextWithIcon
                  text={lng}
                  iconProps={{
                    icon: FlagMap[code] !== undefined ? code : null,
                    pointer: true,
                    followLangDirection: false,
                  }}
                  {...props}
                />
              </S.Button>
            );
          })
          .slice(0, sliceTo)}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
  return hide === true ? null : Selector;
};
