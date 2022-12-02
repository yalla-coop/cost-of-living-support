import * as Organisation from '../model';
import sendEmail from '../../../services/mailing';
import * as templatesId from '../../../services/mailing/templates/templates-constants';
import { addDefaultSectionsForOrganisation } from '../../section/model';
import { organisationStatuses } from '../../../constants';

// id is the organisation id NOT user's
const updateOrganisationStatus = async ({ id, status, explanation }) => {
  await Organisation.updateOrganisationStatus({ id, status });

  const organisation = await Organisation.findOrganisationsWithUserByOrgId(id);
  if (status === organisationStatuses.APPROVED) {
    await addDefaultSectionsForOrganisation({ organisationId: id });
    sendEmail(
      templatesId.ORG_APPROVED,
      { to: organisation.userEmail },
      {
        name: organisation.userFirstName,
      },
    );
  } else if (status === organisationStatuses.REJECTED) {
    sendEmail(
      templatesId.ORG_REJECTED,
      { to: organisation.userEmail },
      {
        name: organisation.userFirstName,
        explanation,
      },
    );
  }
};

export default updateOrganisationStatus;
