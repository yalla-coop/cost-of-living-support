import { useEffect, createContext, useState, useContext } from 'react';
import { Organisations } from '../api-calls';
import { useAuth } from './auth';
import { defaultResources } from '../constants/resources';
import { ThemeProvider } from '@emotion/react';
import colors, { defaultColors } from '../theme/colors';
import theme from '../theme';

import formatColor from '../helpers/format-color';

const initialUserState = {
  id: null,
  logoUrl: '',
  uniqueSlug: '',
  resources: [],
  status: null,
  colors: colors,
};

const AdminContext = createContext({
  adminOrg: initialUserState,
  setAdminOrg: () => {},
  getAdminOrgInfo: () => {},
  logout: () => {},
});

const AdminOrgProvider = (props) => {
  const [adminOrg, setAdminOrg] = useState(initialUserState);
  const { user } = useAuth();

  const _setAdminOrg = (data) => {
    // set adminOrg in state
    setAdminOrg(data);
  };

  const getAdminOrgInfo = async () => {
    const { data } = await Organisations.getOrganisation({
      id: user.organisationId,
    });
    if (data) {
      _setAdminOrg({
        ...data,
        resources: defaultResources.map((r) => {
          const resource = data?.resources?.find((res) => res.key === r.key);
          return resource || r;
        }),
      });
    } else {
      _setAdminOrg(initialUserState);
    }
  };

  useEffect(() => {
    getAdminOrgInfo();
    return () => _setAdminOrg(initialUserState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  const updatedColors = ({
    mainHeaderBgColor,
    section1BgColor,
    section2BgColor,
    section3BgColor,
    section4BgColor,
    section5BgColor,
    section1TextColor,
    section2TextColor,
    section3TextColor,
    section4TextColor,
    section5TextColor,
  }) => {
    const updated = {
      ...theme.colors,
      mainHeaderBgColor: mainHeaderBgColor && formatColor(mainHeaderBgColor),
      section1BgColor: section1BgColor && formatColor(section1BgColor),
      section2BgColor: section2BgColor && formatColor(section2BgColor),
      section3BgColor: section3BgColor && formatColor(section3BgColor),
      section4BgColor: section4BgColor && formatColor(section4BgColor),
      section5BgColor: section5BgColor && formatColor(section5BgColor),
      section1TextColor: section1TextColor && formatColor(section1TextColor),
      section2TextColor: section2TextColor && formatColor(section2TextColor),
      section3TextColor: section3TextColor && formatColor(section3TextColor),
      section4TextColor: section4TextColor && formatColor(section4TextColor),
      section5TextColor: section5TextColor && formatColor(section5TextColor),
    };
    return updated;
  };

  const value = {
    adminOrg,
    getAdminOrgInfo,
    setAdminOrg: _setAdminOrg,
  };

  return (
    <ThemeProvider
      theme={{
        ...theme,
        colors: updatedColors(adminOrg.colors || defaultColors),
      }}
    >
      <AdminContext.Provider value={value} {...props} />
    </ThemeProvider>
  );
};

const useAdminOrg = () => {
  const value = useContext(AdminContext);
  return value;
};

export { AdminOrgProvider, useAdminOrg };
export default AdminContext;
