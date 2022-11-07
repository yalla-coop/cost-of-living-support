import axios from 'axios';
import handleError from './format-error';

const STEPS_BASE = '/translation';

const getTranslation = async ({ id, form, options } = {}) => {
  try {
    const { data } = await axios.get(`${STEPS_BASE}/${id}`, form);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { getTranslation };
