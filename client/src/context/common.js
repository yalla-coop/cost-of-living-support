import { useState, useEffect, createContext, useContext } from 'react';
import { Common } from '../api-calls';
import { useTranslation } from 'react-i18next';

export const CommonContextData = createContext(null);

const CommonProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const { language: lng } = i18n;
  const [common, setCommon] = useState(null);

  useEffect(() => {
    const fetchCommon = async () => {
      const { data, error } = await Common.getCommon({
        lng,
      });
      const _data = data[0].content;
      if (error) {
        // message.error('Something went wrong, please try again later');
      } else {
        i18n.addResourceBundle(lng, 'common', {
          ..._data,
        });
        setCommon(_data);
      }
    };
    fetchCommon();
  }, [lng]);

  return (
    <CommonContextData.Provider value={{ common }}>
      {children}
    </CommonContextData.Provider>
  );
};

const useCommon = () => {
  const data = useContext(CommonContextData);
  return data;
};

export { CommonProvider, useCommon };
