/* eslint-disable id-length */
import Amplify from '@aws-amplify/core'

const REACT_APP_COGNITO_POOL_ID = 'us-east-1_nZrhNdcZO'
const REACT_APP_COGNITO_POOL_CLIENT_ID = '5i776ar7vea6j2hmg49npgk20i'
const REACT_APP_COGNITO_REGION = 'us-east-1'

// All possible configs: https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource
const cognitoConfig = {
  Auth: {
    authenticationFlowType: 'USER_PASSWORD_AUTH',
    mandatorySignIn: true,
    region: REACT_APP_COGNITO_REGION,
    userPoolId: REACT_APP_COGNITO_POOL_ID,
    userPoolWebClientId: REACT_APP_COGNITO_POOL_CLIENT_ID,
  },
}

Amplify.configure(cognitoConfig)
