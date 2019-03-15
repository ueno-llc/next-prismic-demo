import React from 'react';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { RichText } from 'prismic-reactjs';
import { get } from 'lodash';
import Error from 'next/error'

import { customPage as contactPage } from 'graphql/custom-page';
import { Intro } from 'components/intro/Intro';
import { Slices } from 'containers/slices/Slices';

export default () => (
  <>
    <Helmet title="Contact" />

    <Query query={contactPage} variables={{
      uid: 'contact',
      lang: 'en-us',
    }}>
      {({ loading, error, data: { custom_page: page } }) => {
        if (error) return <div>Error</div>

        if (!page && !loading) {
          return <Error statusCode={404} />
        }

        return (
          <>
            <Intro isLoading={loading}>
              <h1>{RichText.asText(get(page, 'title', []))}</h1>
              <h2>{RichText.asText(get(page, 'subheading', []))}</h2>
              <p>{RichText.asText(get(page, 'text', []))}</p>
            </Intro>

            <Slices data={get(page, 'body', [])} />
          </>
        )
      }}
    </Query>
  </>
);