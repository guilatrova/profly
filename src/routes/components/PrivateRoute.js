import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { useAuthentication } from 'core/authentication'
import PropTypes from 'prop-types'
import { LOGIN } from 'routes/paths'

function PrivateRoute(props) {
  const { isAuthenticated, loading } = useAuthentication()
  const { location } = props

  if (loading) return <></>

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: LOGIN,
          state: { from: location },
        }}
      />
    )
  }

  return <Route {...props} />
}

PrivateRoute.propTypes = {
  ...Route.propTypes, // eslint-disable-line react/forbid-foreign-prop-types
  isAuthenticated: PropTypes.bool,
}

export default PrivateRoute
