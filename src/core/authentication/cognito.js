import React, { useState, useEffect, useContext, createContext } from 'react';
import { useApolloClient } from '@apollo/client';
import { func } from 'prop-types';
import Auth from '@aws-amplify/auth';

import './config';

import { setSessionToken } from '../../utils/localStorage';

const getToken = session => session.idToken.jwtToken;

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  logout: () => {},
  refresh: () => {},
};

export const CognitoContext = createContext(initialState);

export const useCognito = () => useContext(CognitoContext);

// eslint-disable-next-line react/prop-types
export const CognitoProvider = ({ children, onRedirectCallback, onLogoutCallback }) => {
  const apolloClient = useApolloClient();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const retrieveLoggedSession = async () => {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();
      const token = getToken(session);

      setIsAuthenticated(true);
      setSessionToken(token);
      setUser(loggedUser);
    } catch (err) {
      setIsAuthenticated(false);
    }
  }

  const handleLogout = () => {
    Auth.signOut().then(() => {
      onLogoutCallback();
      apolloClient.resetStore();
    });
  }

  useEffect(() => {
    const initCognito = async () => {
      if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
        onRedirectCallback();
      }

      await retrieveLoggedSession();

      setLoading(false);
    };
    initCognito();
  }, []);

  return (
    <CognitoContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        logout: handleLogout,
        refresh: retrieveLoggedSession
      }}
    >
      {children}
    </CognitoContext.Provider>
  );
};

export const getSessionToken = async () => (await Auth.currentSession())?.idToken?.jwtToken;

CognitoProvider.propTypes = {
  onRedirectCallback: func.isRequired,
  onLogoutCallback: func.isRequired
};

export default {
  provider: CognitoProvider,
  useAuthentication: useCognito,
  getSessionToken
};
