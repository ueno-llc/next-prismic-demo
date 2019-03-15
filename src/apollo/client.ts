import { ApolloClient, NormalizedCacheObject } from 'apollo-client';
import fetch from 'isomorphic-unfetch';
import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';

import introspectionQueryResultData from '../../.cache/prismic.fragments.json';

let apolloClient: ApolloClient<any> | null = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState?: NormalizedCacheObject) {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
  });
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: PrismicLink({
      uri: "https://ueno-starter-kit-universally-test.prismic.io/graphql",
      accessToken: "MC5XUGRJS1NvQUFDa0FNQ3R6.77-977-977-977-977-977-977-9De-_ve-_vURp77-977-977-977-9H--_vWPvv73vv73vv73vv73vv73vv73vv70gA--_ve-_vVXvv70",
    }),
    cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {})
  })
}

export default function initApollo (initialState?: NormalizedCacheObject) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient;
}

