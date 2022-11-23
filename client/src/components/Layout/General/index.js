import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import * as S from './style';
import { usePublicOrg } from '../../../context/public-org';
import { useAdminOrg } from '../../../context/admin-org';
import { OrganisationLogo } from '../../../components';
import GoBack from '../../GoBack';
import theme from '../../../theme';

// Uncomment to test language translation
import Button from '../../../components/Button';
import { types } from '../../../constants';

const General = ({ children, goBack, maxWidth, showHelp, ...props }) => {
  const { i18n } = useTranslation();
  const { publicOrg } = usePublicOrg();
  const { adminOrg } = useAdminOrg();

  return (
    <S.Container>
      uncomment to check language translation
      <Button
        handleClick={() => i18n.changeLanguage(types.languageCodes.ENGLISH)}
        text="English"
      />
      <Button
        handleClick={() => i18n.changeLanguage(types.languageCodes.ARABIC)}
        text="Arabic"
      />
      <Button
        handleClick={() => i18n.changeLanguage(types.languageCodes.FRENCH)}
        text="French"
      />
      <OrganisationLogo logoUrl={adminOrg?.logoUrl || publicOrg?.logoUrl} />
      <S.Content maxWidth={maxWidth}>
        {goBack && (
          <GoBack
            mb="6"
            mbM="5"
            ml={`${theme.constants.gridGutter.desktop / 2}px`}
            mlT={`${theme.constants.gridGutter.tablet / 2}px`}
            mlM={`${theme.constants.gridGutter.mobile / 2}px`}
          />
        )}
        {children}
      </S.Content>
      footer goes here
    </S.Container>
  );
};

General.propTypes = {
  children: PropTypes.node.isRequired,
};

export default General;
