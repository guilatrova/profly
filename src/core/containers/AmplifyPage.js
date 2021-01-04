import React from 'react';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { Redirect } from 'react-router-dom';
import { useAuthentication } from '../authentication';

const FORM_FIELDS = [
  { type: 'username' },
  { type: 'email' },
  { type: 'password' },
];

const AmplifyPage = () => {
  const { isAuthenticated, refresh } = useAuthentication();

  if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;

  return (
    <AmplifyAuthenticator handleAuthStateChange={refresh}>
      <AmplifySignUp slot="sign-up" formFields={FORM_FIELDS}></AmplifySignUp>
    </AmplifyAuthenticator>
  );
};

export default AmplifyPage;
