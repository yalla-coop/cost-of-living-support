import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from '../../../api-calls';
import { Typography as T, Grid, Inputs, Modal } from '../../../components';
import { navRoutes } from '../../../constants';
import * as S from './style';

const { Row, Col } = Grid;
const { Dropdown } = Inputs;

const options = [
  { label: 'Admin', value: 'ADMIN' },
  { label: 'Super Admin', value: 'SUPER_ADMIN' },
  { label: 'Remove account', value: 'REMOVE_ACCOUNT' },
  { label: 'Reject account', value: 'REJECT_ACCOUNT' },
];

const UserRow = ({
  name,
  email,
  role,
  setUsers,
  setError,
  id,
  organisation,
}) => {
  const originalRole = role;
  const [selected, setSelected] = useState(originalRole);
  const [submitRole, setSubmitRole] = useState(null);
  const [confirmUpdateRole, setConfirmUpdateRole] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (selected === 'REJECT_ACCOUNT') {
      return navigate(
        navRoutes.SUPER_ADMIN.REJECT_ORGANISATION.replace(':id', id)
      );
    } else if (selected === 'REMOVE_ACCOUNT') {
      setConfirmDeleteUser({ id });
    } else if (selected !== role) {
      setSubmitRole({ role: selected, id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, selected]);

  const onCancel = () => {
    if (submitRole && submitRole.role) {
      setSubmitRole(null);
    }
    if (confirmDelete) {
      setConfirmDelete(false);
    }
    setSelected(originalRole);
  };

  const handleSubmit = async () => {
    const { data, error } = await Users.updateUserRole(submitRole);
    if (error) {
      setError(error.message);
    } else {
      setUsers((old) => old.map((user) => (user.id === data.id ? data : user)));
      setError('');
    }
  };

  const handleDelete = async () => {
    const { error } = await Users.deleteUser({
      id: confirmDeleteUser.id,
    });
    if (error) {
      setError(error.message);
    } else {
      setUsers((old) => old.filter((user) => user.id !== confirmDeleteUser.id));
      setError('');
    }
  };

  return (
    <>
      <Col w={[4, 12, 4]} mb="6" mbT="2">
        <T.P color="neutralMain" weight="bold" style={{ width: '100%' }}>
          {organisation}
        </T.P>
        <T.P color="neutralDark">{name}</T.P>
      </Col>
      <Col w={[4, 12, 4]} mb="6" mbT="2">
        <T.P color="neutralMain" weight="bold">
          {email}
        </T.P>
      </Col>
      <Col w={[4, 12, 4]} mb="4">
        <Dropdown
          options={options}
          allowClear="false"
          selected={selected}
          handleChange={(value) => {
            setSelected(value);
            if (value === 'REMOVE_ACCOUNT') {
              setConfirmDelete(true);
            } else {
              setConfirmUpdateRole(true);
            }
          }}
        />
      </Col>
      <S.Divider />
      <Modal
        type="updateSuccess"
        title="Are you sure?"
        description="This will give the user access to edit any content on the tool and manage the access level of other administrators."
        visible={confirmUpdateRole}
        setIsModalVisible={setConfirmUpdateRole}
        onCancel={onCancel}
        parentFunc={handleSubmit}
      />

      <Modal
        type="updateSuccess"
        title="Are you sure?"
        description="delete user"
        visible={confirmDelete}
        setIsModalVisible={setConfirmDelete}
        onCancel={onCancel}
        parentFunc={handleDelete}
      />
    </>
  );
};

const Organisations = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await Users.getAdminUsers();
      if (error) {
        setError(error.message);
      } else {
        setUsers(data);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <Row>
        <Col w={[4, 12, 12]}>
          <T.H1 mtM="5" style={{ width: '100%' }}>
            Organisations
          </T.H1>
        </Col>
      </Row>
      <Row mt="8">
        <Col w={[0, 0, 4]}>
          <T.P color="neutralMain" mb="6" weight="bold">
            Name
          </T.P>
        </Col>
        <Col w={[0, 0, 4]}>
          <T.P color="neutralMain" mb="6" weight="bold">
            Email
          </T.P>
        </Col>
        <Col w={[0, 0, 4]}>
          <T.P color="neutralMain" mb="6" weight="bold">
            Role
          </T.P>
        </Col>
      </Row>
      {users &&
        users.map((user) => (
          <Row key={user.id} ai="center">
            <UserRow
              name={`${user.firstName} ${user.lastName}`}
              email={user.email}
              role={user.role}
              setUsers={setUsers}
              setError={setError}
              id={user.id}
              organisation={user.organisationName}
            />
          </Row>
        ))}
      {error && <T.P color="error">{error}</T.P>}
    </>
  );
};

export default Organisations;
