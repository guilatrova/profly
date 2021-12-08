import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import { Emoji as EmojiDisplay } from 'emoji-mart';

const useStyles = makeStyles(theme => ({
  errorMessage: {
    padding: theme.spacing(1)
  }
}));

const ApolloErrorHandler = ({ operation="", hidden=false, children: graphql_error }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [pastMessage, setMessage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    if (graphql_error) {
      const message = graphql_error["message"] || graphql_error;

      if (message != pastMessage) {
        console.error(graphql_error);
        setMessage(message);
        enqueueSnackbar(`${operation} failed: ${message}`, { variant: 'error' });
      }
    }
  }, [operation, graphql_error]);

  if (hidden || !graphql_error)
    return null;

  return (
    <Box
      color="error.main"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <EmojiDisplay emoji="cry" set="twitter" size={24} />
      <p className={classes.errorMessage}>Sorry, something unexpected happened and we were unable to display this data</p>
    </Box>
  )
};

ApolloErrorHandler.propTypes = {
  operation: PropTypes.string,
  children: PropTypes.object,
  hidden: PropTypes.bool
}

export default ApolloErrorHandler;
