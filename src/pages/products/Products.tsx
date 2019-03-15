import React from 'react';
import Helmet from 'react-helmet';
import { RichText } from 'prismic-reactjs';
import { products } from 'graphql/products';
import { Query } from 'react-apollo';
import { get } from 'lodash';
import Error from 'next/error'
import { customPage as productsPage } from 'graphql/custom-page';
import { linkResolver } from 'utils/linkResolver';
import { Item } from './components/list/Item';
import { List } from './components/list/List';
import { Intro } from 'components/intro/Intro';

export default () => (
  <>
    <Helmet title="Products" />

    <Query query={productsPage} variables={{
        lang: 'en-us',
        uid: 'products',
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
            </>
          );
        }}
      </Query>

      <Query query={products} variables={{
          lang: 'en-us',
        }}>
          {({ loading, error, data: { allProducts } }) => {
            if (error) return <div>Error</div>

            if (!allProducts && !loading) {
              return <Error statusCode={404} />
            }

            return (
              <List isLoading={loading}>
                {get(allProducts, 'edges', []).map(({ node: product }: any, i: number) => (
                  <Item
                    isLoading={loading}
                    key={get(product, '_meta.uid', `product-${i + 1}`)}
                    url={linkResolver(product)}
                    title={RichText.asText(get(product, 'name', []))}
                    description={RichText.asText(get(product, 'description', []))}
                    src={get(product, 'hero_image.square.url', '[]')}
                  />
                ))}
              </List>
            );
          }}
      </Query>
  </>
);