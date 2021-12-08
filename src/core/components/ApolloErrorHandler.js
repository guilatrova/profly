import { useEffect } from 'react';
import { useSnackbar } from 'notistack';


// eslint-disable-next-line react/prop-types
const ApolloErrorHandler = ({ operation="", children: graphql_error }) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.error(graphql_error);
    const message = graphql_error["message"] || JSON.stringify()
    enqueueSnackbar(`${operation} failed: ${message}`, { variant: 'error' });
  }, [operation, graphql_error]);

  return null;
};

export default ApolloErrorHandler;
