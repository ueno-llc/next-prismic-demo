import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { PrismicLink } from 'apollo-link-prismic';
import fetch from 'isomorphic-unfetch';
import { config } from 'utils/config';

import introspectionQueryResultData from '../../.cache/prismic.fragments.json';

let apolloClient: ApolloClient<any> | null = null;

const { browser } = (process as any) || { browser: true };

// Polyfill fetch() on the server (used by apollo-client)
if (!browser) {
  (global as any).fetch = fetch;
}

function create(initialState?: any) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: !!browser,
    ssrMode: !browser, // Disables forceFetch on the server (so queries are only run once)
    link: PrismicLink({
      uri: config.prismicGraphqlApi,
      accessToken: config.prismicAccessToken,
    }),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
  });
}

export default function initApollo(initialState?: any) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
