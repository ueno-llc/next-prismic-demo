import NextApp, { Container } from 'next/app';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../src/apollo/with-apollo-client';
import AppLayout from '../src/components/app-layout/AppLayout';

class App extends NextApp {

  state = {
    preview: false,
  };

  componentDidMount() {
    this.setState({
      preview: true,
    });
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props as any;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <AppLayout>
            <Component {...pageProps} preview={this.state.preview} />
          </AppLayout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(App);
