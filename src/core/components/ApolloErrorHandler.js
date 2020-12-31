import React from 'react';


// eslint-disable-next-line react/prop-types
const ApolloErrorHandler = ({ children }) => {
  return (
    <pre>{JSON.stringify(children)}</pre>
  );
};

export default ApolloErrorHandler;
