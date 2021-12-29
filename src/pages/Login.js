import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import { Hub } from '@aws-amplify/core'
import {
  TOAST_AUTH_ERROR_EVENT,
  UI_AUTH_CHANNEL,
} from '@aws-amplify/ui-components'
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react'
import { useAuthentication } from 'core/authentication'
import { useSnackbar } from 'notistack'

const FORM_FIELDS = [
  { type: 'username' },
  { type: 'email' },
  { type: 'password' },
]

const AmplifyPage = () => {
  const { isAuthenticated, refresh } = useAuthentication()
  const { enqueueSnackbar } = useSnackbar()

  const handleToastErrors = ({ payload }) => {
    if (payload.event === TOAST_AUTH_ERROR_EVENT && payload.message) {
      enqueueSnackbar(payload.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    Hub.listen(UI_AUTH_CHANNEL, handleToastErrors)
    return () => Hub.remove(UI_AUTH_CHANNEL, handleToastErrors)
  })

  if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />

  return (
    <AmplifyAuthenticator hideToast handleAuthStateChange={refresh}>
      <AmplifySignUp formFields={FORM_FIELDS} slot="sign-up"></AmplifySignUp>
    </AmplifyAuthenticator>
  )
}

export default AmplifyPage
