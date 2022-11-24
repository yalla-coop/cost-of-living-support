import { useTranslation } from 'react-i18next';
import { navRoutes } from '../../constants';
import { Typography as T } from '../../components';
import Logo from '../../components/assets/Logo.png';
import { common } from '../../constants';

import * as S from './style';

const LandingContent = () => {
  const { t } = useTranslation();
  return (
    <>
      <S.PageHead showBGImage>
        <S.HeaderContent>
          <S.LogoContainer to={navRoutes.GENERAL.HOME}>
            <img src={Logo} alt="logo" />
          </S.LogoContainer>
          <S.HeaderText>
            <S.pageTitle ta="center" weight="bold" color="white">
              {t(
                'common.heading.costOfLivingHelper',
                common.heading.costOfLivingHelper
              )}
            </S.pageTitle>
          </S.HeaderText>
        </S.HeaderContent>
      </S.PageHead>
      <S.Section mt="8" mtM="5">
        <S.StyledText mb="8" mbM="6">
          {t(
            'common.section.worriedAbout.description',
            common.section.worriedAbout.description
          )}
        </S.StyledText>
        <T.H2 color="black" mb="4">
          {t(
            'common.section.worriedAbout.title',
            common.section.worriedAbout.title
          )}
        </T.H2>
      </S.Section>
    </>
  );
};

export default LandingContent;
