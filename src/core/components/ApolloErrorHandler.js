import React from 'react';


// eslint-disable-next-line react/prop-types
const ApolloErrorHandler = ({ children }) => {
  return (
    <pre>{children}</pre>
  );
};

export default ApolloErrorHandler;
