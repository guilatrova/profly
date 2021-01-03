import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSessionToken } from '../authentication';

const getAuthorizationHeader = async () => ({ Authorization: `Bearer ${await getSessionToken()}` });

const getHeaders = async () => {
  const headers = await getAuthorizationHeader();

  return { headers };
};

const authMiddleware = setContext(getHeaders);

const httpLink = new HttpLink({
  uri: 'http://localhost:8000/graphql/'
});

const link = ApolloLink.from([ authMiddleware, httpLink ]);

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
  cache: new InMemoryCache(),
  link
});

export default client;
