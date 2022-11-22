import axios from 'axios';
import handleError from './format-error';

const COMMON_BASE = '/common';

const getCommon = async ({ options, lang }) => {
  try {
    const { data } = await axios.get(`${COMMON_BASE}/`, {
      params: { lang },
    });

    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getCommon };
