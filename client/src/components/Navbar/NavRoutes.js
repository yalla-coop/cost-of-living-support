import { SUPER_ADMIN, ADMIN } from '../../constants/nav-routes';
import R from '../../constants/roles';
import * as S from './style';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
const handleClick = (cb) => {
  if (typeof cb === 'function') {
    return cb(false);
  }
  return;
};

const DecideRoutes = ({ setOpen }) => {
  const {
    user: { role },
    logout,
  } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    handleClick(setOpen);
    logout();

    navigate(ADMIN.LOGIN);
  };

  switch (role) {
    case R.ADMIN:
      return (
        <>
          <S.Link to={ADMIN.DASHBOARD} onClick={() => handleClick(setOpen)}>
            <S.Head3 weight="bold" color="neutralMain">
              Home
            </S.Head3>
          </S.Link>
          <S.Link to={ADMIN.EDIT_DETAILS} onClick={() => handleClick(setOpen)}>
            <S.Head3 weight="bold" color="neutralMain">
              Edit account details
            </S.Head3>
          </S.Link>
          <S.Link
            to={ADMIN.ADD_UPDATE_CONTENT}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Add/update content
            </S.Head3>
          </S.Link>
          <S.Link
            to={ADMIN.CUSTOMISE_LINKS}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Customise resources and phone numbers
            </S.Head3>
          </S.Link>
          <S.Link to={ADMIN.CUSTOMISE} onClick={() => handleClick(setOpen)}>
            <S.Head3 weight="bold" color="neutralMain">
              Add/update brand colours
            </S.Head3>
          </S.Link>
          <S.Link onClick={handleLogout} to={ADMIN.LOG_OUT}>
            <S.Head3 weight="bold" color="neutralMain">
              Log out
            </S.Head3>
          </S.Link>
        </>
      );
    case R.SUPER_ADMIN:
      return (
        <>
          <S.Link
            to={SUPER_ADMIN.DASHBOARD}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Home
            </S.Head3>
          </S.Link>
          <S.Link
            to={SUPER_ADMIN.EDIT_CONTENT}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Edit content
            </S.Head3>
          </S.Link>
          <S.Link
            to={SUPER_ADMIN.ORGANISATIONS}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Organisations
            </S.Head3>
          </S.Link>
          <S.Link
            to={SUPER_ADMIN.CONTENT_REQUESTS}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Content requests
            </S.Head3>
          </S.Link>
          <S.Link to={SUPER_ADMIN.CHANGES} onClick={() => handleClick(setOpen)}>
            <S.Head3 weight="bold" color="neutralMain">
              Changes
            </S.Head3>
          </S.Link>
          <S.Link
            to={SUPER_ADMIN.EDIT_DETAILS}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Edit details
            </S.Head3>
          </S.Link>
          <S.Link
            to={SUPER_ADMIN.CUSTOMISE}
            onClick={() => handleClick(setOpen)}
          >
            <S.Head3 weight="bold" color="neutralMain">
              Customise
            </S.Head3>
          </S.Link>
          <S.Link onClick={handleLogout} to={ADMIN.LOG_OUT}>
            <S.Head3 weight="bold" color="neutralMain">
              Log out
            </S.Head3>
          </S.Link>
        </>
      );
    default:
      return (
        <>
          <S.Link to={ADMIN.LOGIN} onClick={() => handleClick(setOpen)}>
            <S.Head3 weight="bold" color="neutralMain">
              log in
            </S.Head3>
          </S.Link>
        </>
      );
  }
};

const Routes = ({ setOpen }) => {
  return (
    <>
      <DecideRoutes setOpen={setOpen} />
    </>
  );
};

export default Routes;
