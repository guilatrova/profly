import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getHeaders } from './utils';
import { API_ENDPOINT } from '../constants/api';


const httpLink = new HttpLink({
  uri: `${API_ENDPOINT}/graphql/`
});

const authMiddleware = setContext(getHeaders);

const link = ApolloLink.from([ authMiddleware, httpLink ]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

export default client;
