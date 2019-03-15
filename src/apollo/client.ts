import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import fetch from 'isomorphic-unfetch';
import { config } from 'utils/config';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import Prismic from 'prismic-javascript';

import introspectionQueryResultData from '../../.cache/prismic.fragments.json';

let apolloClient: ApolloClient<any> | null = null;

const { browser } = (process as any) || { browser: true };

// Polyfill fetch() on the server (used by apollo-client)
if (!browser) {
  (global as any).fetch = fetch;
}

let previewRef: undefined;

if (browser) {
  const cookies: any = document.cookie.split(';').reduce((acc: any, n) => {
    const [k, v] = n.split('=').map((j) => decodeURIComponent(j.trim()));
    acc[k] = v;
    return acc;
  }, {});
  if (cookies[Prismic.previewCookie]) {
    previewRef = cookies[Prismic.previewCookie];
  }
}

function PrismicLink({ uri, accessToken }: any) {
  const BaseURIReg = /^(https?:\/\/.+?\..+?\..+?)\/graphql\/?$/;
  const matches = uri.match(BaseURIReg);
  if (matches && matches[1]) {
    const [_, baseURI] = matches;
    const prismicClient = Prismic.client(`${baseURI}/api`, { accessToken });
    const prismicLink = setContext((request, options) => {
      return prismicClient.getApi().then((api) => {
        const masterRef = api.masterRef.ref;
        const authorizationHeader = accessToken
          ? { Authorization: `Token ${accessToken}` }
          : {};
        return {
          headers: {
            ...options.headers,
            ...authorizationHeader,
            'Prismic-ref': previewRef || masterRef,
          },
        };
      });
    });

    const httpLink = new HttpLink({
      uri,
      useGETForQueries: true,
    });

    return prismicLink.concat(httpLink);
  } else {
    throw new Error(`${uri} isn't a valid Prismic GraphQL endpoint`);
  }
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
    defaultOptions: previewRef ? {
      query: {
        fetchPolicy: 'network-only',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    } : undefined,
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
