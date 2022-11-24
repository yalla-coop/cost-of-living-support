import * as Organisation from '../model';
import sendEmail from '../../../services/mailing';
import * as templatesId from '../../../services/mailing/templates/templates-constants';
import * as User from '../../user/model';

const updateOrganisationStatus = async ({ id, status, explanation }) => {
  await Organisation.updateOrganisationStatus({ id, status, explanation });

  const user = await User.findUserWithOrgDetails(id);

  sendEmail(
    templatesId.ORG_REJECTED,
    { to: user.email },
    {
      explanation,
    },
  );
};

export default updateOrganisationStatus;
