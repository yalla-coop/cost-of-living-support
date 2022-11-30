import { organisationStatuses } from '../../../constants';
import { addDefaultSectionsForOrganisation } from '../../section/model';
import { updateOrganisationStatus as updateOrganisationStatusUseCase } from '../use-cases';

const updateOrganisationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const organisations = await updateOrganisationStatusUseCase({
      id,
      status,
    });

    if (status === organisationStatuses.APPROVED) {
      await addDefaultSectionsForOrganisation({ organisationId: id });
    }

    res.json(organisations);
  } catch (error) {
    next(error);
  }
};

export default updateOrganisationStatus;
