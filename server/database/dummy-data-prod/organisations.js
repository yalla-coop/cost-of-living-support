import { query } from '../connect';
import * as T from '../../constants';

const createOrganisation = async ({
  organisationName,
  typeOfOrganisation,
  uniqueSlug,
  mentalHealthSupportResources,
  logoId,
  colors,
}) => {
  const sql = `INSERT INTO organisations (
    organisation_name,
    type_of_organisation,
    unique_slug,
    logo_id,
    colors,
    mental_health_support_resources
  ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
  ) RETURNING *`;
  const res = await query(sql, [
    organisationName,
    typeOfOrganisation,
    uniqueSlug,
    logoId,
    colors,
    mentalHealthSupportResources,
  ]);
  return res.rows[0];
};

const createOrganisations = async () => {
  const superAdminOrganisationData = {
    organisationName: 'Hyde',
    typeOfOrganisation: 'A',
    uniqueSlug: 'hyde',
    mentalHealthSupportResources: T.mentalHealthLinks,
    logoId: null,
    colors: {
      main: '#FC6244',
      secondary: '#3B557A',
      neutral: '#1A202B',
    },
  };
  const HydeOrganisation = await createOrganisation(superAdminOrganisationData);

  return {
    HydeOrganisation,
  };
};

export default createOrganisations;
