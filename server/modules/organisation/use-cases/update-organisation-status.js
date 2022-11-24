import * as Organisation from '../model';

const updateOrganisationStatus = async ({ id, status, explanation }) => {
  return Organisation.updateOrganisationStatus({ id, status, explanation });
};

export default updateOrganisationStatus;
