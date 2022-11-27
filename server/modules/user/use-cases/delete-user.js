import * as User from '../model';
import * as Organisation from '../../organisation/use-cases';

async function deleteUser({ id }) {
  await Organisation.deleteOrganisation({ id });
  return User.updateUserToDeleted(id);
}

export default deleteUser;
