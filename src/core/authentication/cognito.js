import './config'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { func } from 'prop-types'

import { useApolloClient } from '@apollo/client'
import Auth from '@aws-amplify/auth'

import { setSessionToken } from '../../utils/localStorage'

const getToken = (session) => session.idToken.jwtToken

const initialState = {
  isAuthenticated: false,
  loading: true,
  logout: () => {},
  refresh: () => {},
  user: null,
}

export const CognitoContext = createContext(initialState)

export const useCognito = () => useContext(CognitoContext)

// eslint-disable-next-line react/prop-types
export const CognitoProvider = ({
  children,
  onLogoutCallback,
  onRedirectCallback,
}) => {
  const apolloClient = useApolloClient()
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const retrieveLoggedSession = async () => {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser()
      const session = await Auth.currentSession()
      const token = getToken(session)

      setIsAuthenticated(true)
      setSessionToken(token)
      setUser(loggedUser)
    } catch (err) {
      setIsAuthenticated(false)
    }
  }

  const handleLogout = () => {
    Auth.signOut().then(() => {
      onLogoutCallback()
      apolloClient.resetStore()
    })
  }

  useEffect(() => {
    const initCognito = async () => {
      if (
        window.location.search.includes('code=') &&
        window.location.search.includes('state=')
      ) {
        onRedirectCallback()
      }

      await retrieveLoggedSession()

      setLoading(false)
    }
    initCognito()
  }, [onRedirectCallback])

  return (
    <CognitoContext.Provider
      value={{
        isAuthenticated,
        loading,
        logout: handleLogout,
        refresh: retrieveLoggedSession,
        user,
      }}
    >
      {children}
    </CognitoContext.Provider>
  )
}

export const getSessionToken = async () =>
  (await Auth.currentSession())?.idToken?.jwtToken

CognitoProvider.propTypes = {
  onLogoutCallback: func.isRequired,
  onRedirectCallback: func.isRequired,
}

export default {
  getSessionToken,
  provider: CognitoProvider,
  useAuthentication: useCognito,
}
