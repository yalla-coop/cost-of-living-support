import { useReducer, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../../theme';

import {
  Grid,
  Typography as T,
  Inputs as I,
  Button,
  TextWithIcon,
} from '../../components';
import * as S from './style';
import validate from '../../validation/schemas/login';
import { Users } from '../../api-calls';
import { useAuth } from '../../context/auth';

import { navRoutes as R } from '../../constants';
const { Row, Col } = Grid;

const initialState = {
  email: '',
  password: '',
  httpError: '',
  validationErrs: {},
  loading: false,
};

function reducer(state, newState) {
  return { ...state, ...newState };
}
const cleanEmail = (email) => email.toLowerCase().trim();

const Login = () => {
  const submitAttempt = useRef(false);
  const [state, setState] = useReducer(reducer, initialState);
  const { email, password, loading, validationErrs, httpError } = state;
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.mobile})`,
  });

  useEffect(() => {
    if (submitAttempt.current) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const validateForm = () => {
    try {
      validate({
        email: cleanEmail(email),
        password,
      });
      setState({ validationErrs: {} });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setState({ validationErrs: error.inner });
      }
      return false;
    }
  };

  const handleLogin = async () => {
    setState({ loading: true });

    const { error, data } = await Users.login({
      email: cleanEmail(email),
      password,
    });

    setState({ loading: false });

    if (error) {
      if (error.statusCode === 409) {
        setState({ validationErrs: { email: error.message } });
      } else {
        setState({ httpError: error.message });
      }
    } else {
      setUser(data);
      if (data.hasOrganisation) {
        navigate(R.ADMIN.DASHBOARD);
      } else {
        navigate(R.ADMIN.CREATE_ORG_DETAILS_FIRST_STEP);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitAttempt.current = true;

    const isValid = validateForm();
    if (isValid) {
      handleLogin();
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <T.H1 weight="bold">Log in</T.H1>
      <Row mt="7">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            label="Email address"
            placeholder="Type your email..."
            margins={{ mt: '2', mb: '1' }}
            type="email"
            value={email}
            autoFocus
            handleChange={(input) => setState({ email: input })}
            error={validationErrs.email}
          />
        </Col>
      </Row>
      <Row mt="7" mtT="6">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            label="Password"
            placeholder="Type your password..."
            margins={{ mt: '2', mb: '1' }}
            type="password"
            value={password}
            handleChange={(input) => setState({ password: input })}
            error={validationErrs.password}
          />
          <T.Link
            to={R.GENERAL.FORGET_PASSWORD}
            color="neutralDark"
            style={{ display: 'block' }}
            mt="10px"
            ml="13px"
            fontSize="0.875rem"
          >
            Forget password?
          </T.Link>
        </Col>
      </Row>
      <Row
        mt="7"
        mtT="6"
        style={{ flex: Number(isMobile), alignItems: 'flex-end' }}
      >
        <Col w={[4, 11, 6]} style={{ alignItems: 'flex-end' }}>
          {httpError && (
            <T.P mb="2" color="error">
              {httpError}
            </T.P>
          )}
          <Button
            variant="primary"
            disabled={false}
            loading={loading}
            text="Log in"
            type="submit"
          />
        </Col>
      </Row>
      <Row mt="5">
        <Col w={[4, 11, 6]}>
          <TextWithIcon
            to={R.ADMIN.WELCOME}
            text="Don’t have an account? Sign up"
            icon="forwardArrow"
            iconColor="primaryMain"
            mr="4px"
          />
        </Col>
      </Row>
    </S.Form>
  );
};

export default Login;
