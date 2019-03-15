import * as React from 'react';
import NextApp, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../src/apollo/with-apollo-client';

import AppLayout from '../src/components/app-layout/AppLayout';

class App extends NextApp {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(App);
