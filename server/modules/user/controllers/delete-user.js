import * as User from '../use-cases';
import * as Organisation from '../../organisation/use-cases';

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.body;
    await Organisation.deleteOrganisation({ id });
    await User.deleteUser({ id });
    res.send();
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
