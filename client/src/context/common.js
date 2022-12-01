import { useState, useEffect, createContext, useContext } from 'react';
import { Translations } from '../api-calls';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../helpers';
import { Outlet } from 'react-router-dom';

export const CommonContextData = createContext(null);

const CommonLogic = ({ children }) => {
  const { i18n } = useTranslation();
  const { lng } = useLanguage();
  const [data, setData] = useState(null);
  const dir = i18n.dir();

  useEffect(() => {
    const fetchCommon = async () => {
      const { data, error } = await Translations.getCommon({
        lng,
      });
      const common = data[0].content;
      if (error) {
        // message.error('Something went wrong, please try again later');
      } else {
        i18n.addResourceBundle(lng, 'common', {
          common,
        });
        setData(common);
      }
    };
    fetchCommon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng]);

  const setDirection = (_dir) => {
    document.documentElement.style.direction = _dir;
  };

  i18n.on('languageChanged', function (lng) {
    setDirection(dir);
  });

  useEffect(() => {
    setDirection(dir);
    return () => {
      setDirection('ltr');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommonContextData.Provider value={{ data }}>
      {children}
    </CommonContextData.Provider>
  );
};

const useCommon = () => {
  const data = useContext(CommonContextData);
  return data;
};

const CommonProvider = () => {
  return (
    <CommonLogic>
      <Outlet />
    </CommonLogic>
  );
};

export { CommonProvider, useCommon };
