import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'https://api.suggestic.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': process.env.API_KEY_SUGGESTIC!
  }
});

export default client;
