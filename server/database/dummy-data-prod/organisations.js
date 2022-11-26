import { query } from '../connect';

const createOrganisation = async ({
  organisationName,
  typeOfOrganisation,
  uniqueSlug,
  logoId,
  colors,
  status,
}) => {
  const sql = `INSERT INTO organisations (
    organisation_name,
    type_of_organisation,
    unique_slug,
    logo_id,
    colors,
    status
   ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7
  ) RETURNING *`;
  const res = await query(sql, [
    organisationName,
    typeOfOrganisation,
    uniqueSlug,
    logoId,
    colors,
    status,
  ]);
  return res.rows[0];
};

const createOrganisations = async () => {
  const superAdminOrganisationData = {
    organisationName: 'Hyde',
    typeOfOrganisation: 'A',
    uniqueSlug: 'hyde',
    logoId: null,
    colors: {
      // main: { h: '10', s: '0.97', l: '0.63' },
      // secondary: { h: '215', s: '0.35', l: '0.35' },
      // neutral: { h: '219', s: '0.25', l: '0.14' },
      primaryBgMain: { h: '215', s: '0.35', l: '0.35' },
      secondaryBgMain: { h: '22', s: '0.97', l: '0.66' },
      tertiaryBgMain: { h: '46', s: '0.15', l: '0.83' },
      quartenaryBgMain: { h: '48', s: '0.41', l: '0.93' },
      quinaryBgMain: { h: '219', s: '0.25', l: '0.14' },

      primaryTextMain: { h: '0', s: '1', l: '1' },
      secondaryTextMain: { h: '219', s: '0.25', l: '0.14' },
      tertiaryTextMain: { h: '219', s: '0.25', l: '0.14' },
      quartenaryTextMain: { h: '219', s: '0.25', l: '0.14' },
      quinaryTextMain: { h: '0', s: '1', l: '1' },
    },
    status: 'APPROVED',
  };
  const HydeOrganisation = await createOrganisation(superAdminOrganisationData);

  return {
    HydeOrganisation,
  };
};

export default createOrganisations;
