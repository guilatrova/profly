import React, { useEffect, useState } from 'react'

import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import { Emoji as EmojiDisplay } from 'emoji-mart'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    padding: theme.spacing(1),
  },
}))

const ApolloErrorHandler = ({
  children: graphql_error,
  hidden = false,
  operation = '',
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [pastMessage, setMessage] = useState('')
  const classes = useStyles()

  useEffect(() => {
    if (graphql_error) {
      const message = graphql_error['message'] || graphql_error

      if (message != pastMessage) {
        console.error(graphql_error)
        setMessage(message)
        enqueueSnackbar(`${operation} failed: ${message}`, { variant: 'error' })
      }
    }
  }, [operation, graphql_error, enqueueSnackbar, pastMessage])

  if (hidden || !graphql_error) return null

  return (
    <Box
      alignItems="center"
      color="error.main"
      display="flex"
      justifyContent="center"
    >
      <EmojiDisplay emoji="cry" set="twitter" size={24} />
      <p className={classes.errorMessage}>
        Sorry, something unexpected happened and we were unable to display this
        data
      </p>
    </Box>
  )
}

ApolloErrorHandler.propTypes = {
  children: PropTypes.object,
  hidden: PropTypes.bool,
  operation: PropTypes.string,
}

export default ApolloErrorHandler
