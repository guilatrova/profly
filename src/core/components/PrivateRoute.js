import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import PropTypes from 'prop-types';

import { useAuthentication } from '../authentication';

const LOGIN_ROUTE = '/login';

function PrivateRoute(props) {
  const { isAuthenticated, loading } = useAuthentication();
  const { location } = props;

  if (loading) return <></>;

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: LOGIN_ROUTE,
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...props} />;
}

PrivateRoute.propTypes = {
  ...Route.propTypes, // eslint-disable-line react/forbid-foreign-prop-types
  isAuthenticated: PropTypes.bool,
};

export default PrivateRoute;
