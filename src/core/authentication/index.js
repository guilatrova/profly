import cognito from './cognito';

const authenticator = cognito;

export const AuthenticationProvider = authenticator.provider;
export const { useAuthentication, getSessionToken } = authenticator;
