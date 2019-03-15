import React from 'react';
import Helmet from 'react-helmet';
import Error from 'next/error'
import { NextDocumentContext } from 'next/document';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import { RichText } from 'prismic-reactjs';
import { product } from 'graphql/products';

import { Segment } from 'components/segment/Segment';
import { Slices } from 'containers/slices/Slices';
import { Hero } from './components/hero/Hero';

interface IProps {
  uid: string;
}

const Product = ({ uid }: IProps) => (
  <>
    <Helmet title="Single product" />

      <Query query={product} variables={{
          uid,
          lang: 'en-us',
        }}>
          {({ loading, error, data: { product } }) => {
            if (error) return <div>Error</div>

            if (!product && !loading) {
              return <Error statusCode={404} />
            }

            return (
              <>
                <Hero
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


Product.getInitialProps = async function (context: NextDocumentContext) {
  const { uid } = context.query
  console.log('uid', uid);

  return { uid }
}

export default Product
