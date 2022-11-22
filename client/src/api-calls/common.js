import axios from 'axios';
import handleError from './format-error';

const COMMON_BASE = '/common';

const getCommon = async ({ options, lng }) => {
  try {
    const { data } = await axios.get(`${COMMON_BASE}/`, {
      params: { lng },
    });

    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getCommon };
