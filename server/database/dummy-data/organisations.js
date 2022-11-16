import { query } from '../connect';
import * as T from '../../constants';

const createOrganisation = async ({
  organisationName,
  typeOfOrganisation,
  uniqueSlug,
  contactLinks,
  mentalHealthSupportResources,
  benefitCalcLink,
  benefitCalcLabel,
  logoId,
  colors,
}) => {
  const sql = `INSERT INTO organisations (
    organisation_name,
    type_of_organisation,
    unique_slug,
    contact_links,
    benefit_calculator_link,
    benefit_calculator_label,
    logo_id,
    colors,
    mental_health_support_resources
  ) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9
  ) RETURNING *`;
  const res = await query(sql, [
    organisationName,
    typeOfOrganisation,
    uniqueSlug,
    contactLinks,
    benefitCalcLink,
    benefitCalcLabel,
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
    contactLinks: [
      {
        type: T.contactLinksTypes.PHONE,
        availability: 'Monday to Friday (9am to 5pm)',
        description: '',
        link: '',
      },
    ],
    mentalHealthSupportResources: T.mentalHealthLinks,
    benefitCalcLink: '',
    benefitCalcLabel: '',
    logoId: null,
    colors: {
      main: { h: '10', s: '0.97', l: '0.63' },
      secondary: { h: '215', s: '0.35', l: '0.35' },
      neutral: { h: '219', s: '0.25', l: '0.14' },
    },
  };
  const admin1OrganisationData = {
    ...superAdminOrganisationData,
    organisationName: 'org1',
    typeOfOrganisation: 'A',
    uniqueSlug: 'orr1-link',
    mentalHealthSupportResources: T.mentalHealthLinks,
    colors: {
      main: { h: '10', s: '0.97', l: '0.63' },
      secondary: { h: '215', s: '0.35', l: '0.35' },
      neutral: { h: '219', s: '0.25', l: '0.14' },
    },
  };
  const HydeOrganisation = await createOrganisation(superAdminOrganisationData);
  const organisation1 = await createOrganisation(admin1OrganisationData);

  return {
    HydeOrganisation,
    organisation1,
  };
};

export default createOrganisations;
