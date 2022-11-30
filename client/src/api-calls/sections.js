import axios from 'axios';
import handleError from './format-error';

const SECTIONS_BASE = '/sections';

const getSections = async ({ options, uniqueSlug, forPublic }) => {
  try {
    const { data } = await axios.get(`${SECTIONS_BASE}`, {
      params: { uniqueSlug, forPublic },
    });

    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const updateSectionsOrder = async ({ options, body }) => {
  try {
    const { data } = await axios.patch(`${SECTIONS_BASE}/order`, body);

    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const createSectionWithTopics = async ({ options, body }) => {
  try {
    const { data } = await axios.post(`${SECTIONS_BASE}`, body);

    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};
const updateSectionWithTopics = async ({ options, body, id }) => {
  try {
    const { data } = await axios.patch(`${SECTIONS_BASE}/${id}`, body);

    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getSectionById = async ({ options, id, forPublic }) => {
  try {
    const { data } = await axios.get(`${SECTIONS_BASE}/${id}`, {
      params: { forPublic },
    });

    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getSubSections = async ({ options, id, forPublic }) => {
  try {
    const { data } = await axios.get(`${SECTIONS_BASE}/sub-sections`, {
      params: { id, forPublic },
    });
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getTopics = async ({ options, sectionId, lng }) => {
  try {
    const { data } = await axios.get(`${SECTIONS_BASE}/${sectionId}/topics`, {
      params: { lng },
    });
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export {
  getSections,
  getSectionById,
  getTopics,
  getSubSections,
  createSectionWithTopics,
  updateSectionWithTopics,
  updateSectionsOrder,
};
