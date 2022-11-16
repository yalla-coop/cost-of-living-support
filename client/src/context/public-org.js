import { useEffect, createContext, useState, useContext } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Organisations } from '../api-calls';
import { matchPath, useLocation, Outlet } from 'react-router-dom';

import setColor from '../helpers/set-color-variations';
import formatColor from '../helpers/format-color';
import updateGradients from '../helpers/update-gradients';
import colors from '../theme/colors';
import { PUBLIC_ORG } from './../constants/nav-routes';
const initialPublicOrgState = {
  id: null,
  logoUrl: '',
  uniqueSlug: '',
  colors: colors,
  organisationName: '',
  mentalHealthSupportResources: [],
  resources: [],
};

const PublicOrgContext = createContext({
  publicOrg: initialPublicOrgState,
  setPublicOrg: () => {},
  logout: () => {},
});

const adjustedTheme = (ancestorTheme, updatedColors) => ({
  ...ancestorTheme,
  colors: updatedColors,
  gradients: updateGradients(updatedColors),
});

const isValidSlug = (pathname) => {
  return !Object.values(PUBLIC_ORG).includes(pathname);
};

// get help details/logo/colors
const PublicOrg = (props) => {
  const location = useLocation();
  const match = matchPath(
    { path: `${PUBLIC_ORG.HOME_ORG}/*`, exact: false, strict: false },
    location.pathname
  );
  const { uniqueSlug } = match?.params || {};
  const [publicOrg, setPublicOrg] = useState(initialPublicOrgState);

  const _setPublicOrg = (data) => {
    // set org in state
    setPublicOrg(data);
  };

  const updatedColors = ({ main, secondary }) => {
    if (!main || !secondary) {
      return colors;
    }

    const updated = {
      ...colors,
      primaryMain: formatColor(main),
      primaryMid: formatColor(setColor('primary', main).mid),
      primaryLight: formatColor(setColor('primary', main).light),
      secondaryMain: formatColor(secondary),
      secondaryMid: formatColor(setColor('secondary', secondary).mid),
      secondaryLight: formatColor(setColor('secondary', secondary).light),
      error: formatColor(main),
      borderPrimary: formatColor(main),
    };

    return updated;
  };

  const getPublicOrgInfo = async (uniqueSlug) => {
    const { data } = await Organisations.getOrganisationByUniqueSlug({
      uniqueSlug,
    });

    const defaultColors = {
      main: colors.primaryMainObj,
      secondary: colors.secondaryMainObj,
    };

    if (data) {
      _setPublicOrg({
        ...data,
        colors: updatedColors(data.colors || defaultColors),
      });
    } else {
      _setPublicOrg(initialPublicOrgState);
    }
  };

  useEffect(() => {
    const validSlug = isValidSlug(location.pathname);

    getPublicOrgInfo(validSlug && uniqueSlug ? uniqueSlug : 'hyde');
    return () => _setPublicOrg(initialPublicOrgState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueSlug]);

  const value = {
    publicOrg,
    getPublicOrgInfo,
    setPublicOrg: _setPublicOrg,
  };

  return (
    <ThemeProvider theme={(theme) => adjustedTheme(theme, publicOrg.colors)}>
      <PublicOrgContext.Provider value={value} {...props} />
    </ThemeProvider>
  );
};

const usePublicOrg = () => {
  const value = useContext(PublicOrgContext);
  return value;
};

const PublicOrgProvider = () => {
  return (
    <PublicOrg>
      <Outlet />
    </PublicOrg>
  );
};

export { PublicOrgProvider, usePublicOrg };
export default PublicOrgContext;
