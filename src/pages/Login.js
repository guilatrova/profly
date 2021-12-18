import React from 'react'
import { Redirect } from 'react-router-dom'

import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { useAuthentication } from 'core/authentication'

const FORM_FIELDS = [
  { type: 'username' },
  { type: 'email' },
  { type: 'password' },
]

const AmplifyPage = () => {
  const { isAuthenticated, refresh } = useAuthentication()

  if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />

  return (
    <AmplifyAuthenticator handleAuthStateChange={refresh}>
      <AmplifySignUp formFields={FORM_FIELDS} slot="sign-up"></AmplifySignUp>
    </AmplifyAuthenticator>
  )
}

export default AmplifyPage
