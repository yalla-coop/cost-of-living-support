import { useState } from 'react';
import { TextWithIcon, Icon } from '../../../components';
import { FlagMap } from '../../../components/Icon';
import { BasicInput } from '../../Inputs/index';
import * as S from './style';
import { useMediaQuery } from 'react-responsive';
import theme from '../../../theme';
import { useTranslation } from 'react-i18next';
import { types } from '../../../constants';

const props = {
  weight: 'medium',
  mr: 2,
  isButton: true,
};

export const LanguageSelector = ({ hide, handleHide }) => {
  const { i18n } = useTranslation();
  const [search, setSearch] = useState('');

  const sliceTo =
    useMediaQuery({
      query: `(max-width: ${theme.breakpoints.tablet})`,
    }) === true
      ? 12
      : types.languageCodes.length;

  const languages = Object.entries(types.languageCodes).filter(
    ([lang, code]) => {
      return (
        code.toLowerCase().includes(search.toLowerCase()) ||
        lang.toLowerCase().includes(search.toLowerCase())
      );
    }
  );

  const changeLanguage = ({ lang }) => {
    i18n.changeLanguage(types.languageCodes[lang]);
    handleHide();
  };

  const Selector = (
    <S.Wrapper>
      <S.ButtonWrapper>
        <BasicInput
          handleChange={(val) => setSearch(val)}
          label="Search Language"
          value={search}
          name="search-language"
          placeholder="Search"
          suffix={<Icon icon="search" color="neutralMain" />}
        />
      </S.ButtonWrapper>
      <S.ButtonWrapper>
        {languages
          .map(([lang]) => {
            const lng = lang.toLowerCase();
            return (
              <S.Button>
                <TextWithIcon
                  handleClick={() => changeLanguage({ lang })}
                  text={lang}
                  icon={FlagMap[lng] !== undefined ? lng : null}
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
