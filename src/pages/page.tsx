import React from 'react';
import Helmet from 'react-helmet';
import { Query } from 'react-apollo';
import { RichText } from 'prismic-reactjs';
import { customPage } from 'graphql/custom-page';
import { get } from 'lodash';
import { NextDocumentContext } from 'next/document';
import Error from 'next/error';

import { linkResolver } from 'utils/linkResolver';
import { Slices } from 'containers/slices/Slices';
import { Article } from 'components/article/Article';
import { Intro } from 'components/intro/Intro';

interface IProps {
  uid: string;
}

const Page = ({ uid }: IProps) => {
  if (!uid) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Helmet title="Page" />

      <p>hi</p>

      <Query
        query={customPage}
        variables={{
          uid,
          lang: 'en-us',
        }}
      >
        {({ loading, error, data: { custom_page: page } }) => {
          if (error) {
            return <div>Error</div>;
          }

          if (!page && !loading) {
            return <Error statusCode={404} />;
          }

          return (
            <>
              <Intro isLoading={loading}>
                <h1>{RichText.asText(get(page, 'title', []))}</h1>
                <h2>{RichText.asText(get(page, 'subheading', []))}</h2>
                <p>{RichText.render(get(page, 'text', []), linkResolver)}</p>
              </Intro>

              <Article>
                <Slices data={get(page, 'body', [])} />
              </Article>
            </>
          );
        }}
      </Query>
    </>
  );
};

Page.getInitialProps = async (context: NextDocumentContext) => {
  const { uid } = context.query;
  return { uid };
};

export default Page;
