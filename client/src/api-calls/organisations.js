import axios from 'axios';
import handleError from './format-error';

const ORGS_BASE = '/organisations';

const getOrganisation = async ({ id, withUserDetails, options }) => {
  try {
    const { data } = await axios.get(`${ORGS_BASE}/${id}`, {
      params: { withUserDetails },
    });
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const getOrganisationByUniqueSlug = async ({ uniqueSlug, options }) => {
  try {
    const { data } = await axios.get(`${ORGS_BASE}/unique-slug/${uniqueSlug}`);
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

const updateOrganisation = async ({ id, body, withUserDetails, options }) => {
  try {
    const { data } = await axios.patch(`${ORGS_BASE}/${id}`, body, {
      params: { withUserDetails },
    });
    return { data };
  } catch (error) {
    const err = handleError(error, options);
    return { error: err };
  }
};

export { updateOrganisation, getOrganisation, getOrganisationByUniqueSlug };
