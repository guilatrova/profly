import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getHeaders } from './utils';


const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql/'
});

const authMiddleware = setContext(getHeaders);

const link = ApolloLink.from([ authMiddleware, httpLink ]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export default client;
