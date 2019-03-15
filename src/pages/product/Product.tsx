import { Slices } from 'containers/slices/Slices';
import { product } from 'graphql/products';
import { get } from 'lodash';
import { NextDocumentContext } from 'next/document';
import Error from 'next/error';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';

import { Hero } from './components/hero/Hero';

interface IProps {
  uid: string;
}

const Product = ({ uid }: IProps) => {
  if (!uid) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Helmet title="Single product" />

      <Query
        query={product}
        variables={{
          uid,
          lang: 'en-us',
        }}
      >
        {({ loading, error, data: { product } }) => {
          if (error) {
            return <div>Error</div>;
          }

          if (!product && !loading) {
            return <Error statusCode={404} />;
          }

          return (
            <>
              <Hero
                loading={false}
                image={get(product, 'hero_image', {})}
                name={RichText.asText(get(product, 'name', []))}
                description={RichText.render(get(product, 'description', []))}
              />

              <Slices data={get(product, 'body', [])} />
            </>
          );
        }}
      </Query>
    </>
  );
};

Product.getInitialProps = async (context: NextDocumentContext) => {
  const { uid } = context.query;
  return { uid };
};

export default Product;
