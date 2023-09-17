import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { store } from './store'; 

const httpLink = createHttpLink({
  uri: 'https://production.suggestic.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // Get the token from Redux store
  const state = store.getState();
  const token = state.user.token;

  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer ${token}` : "",
      'x-api-key': process.env.API_KEY_SUGGESTIC!,
      'x-user-id': '9fb74fc0-1675-4f04-8309-07c7b8aab25b'
    }
  };
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': process.env.API_KEY_SUGGESTIC!
  }
});

export default client;
