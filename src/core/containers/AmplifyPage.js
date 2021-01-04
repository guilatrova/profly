import React from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignIn,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import { Redirect } from 'react-router-dom';
import { useAuthentication } from '../authentication';

const AmplifyPage = () => {
  const { isAuthenticated, refresh } = useAuthentication();
  const formFields = [
    { type: 'username' },
    { type: 'email' },
    { type: 'password' },
  ];

  const handleAuthStateChange = () => refresh();

  if (isAuthenticated) return <Redirect to={{ pathname: "/" }} />;

  return (
    <AmplifyAuthenticator>
      <AmplifySignIn
        handleAuthStateChange={handleAuthStateChange}
        slot="sign-in"
      ></AmplifySignIn>

      <AmplifySignUp slot="sign-up" formFields={formFields}></AmplifySignUp>
    </AmplifyAuthenticator>
  );
};

export default AmplifyPage;
