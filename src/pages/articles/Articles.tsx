import React from 'react';
import Helmet from 'react-helmet';
import { RichText } from 'prismic-reactjs';
import { Query } from 'react-apollo';
import { get, isEmpty } from 'lodash';
import Error from 'next/error'

import { articles } from 'graphql/articles';
import { customPage as articlePage } from 'graphql/custom-page';
import { linkResolver } from 'utils/linkResolver';
import { Intro } from 'components/intro/Intro';
import { List } from './components/list/List';
import { Item } from './components/list/Item';

export default () => (
  <>
    <Helmet title="Articles" />

    <Query query={articlePage} variables={{
      lang: 'en-us',
      uid: 'articles',
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

    <Query query={articles} variables={{
        lang: 'en-us',
      }}>
        {({ loading, error, data: { allArticles } }) => {
          if (error) return <div>Error</div>

          if (!allArticles && !loading) {
            return <Error statusCode={404} />
          }

          return (
            <List isLoading={loading}>
              {get(allArticles, 'edges', []).map(({ node: article }: any, i: number) => (
                <Item
                  isLoading={loading}
                  key={get(article, '_meta.uid', `article-${i + 1}`)}
                  url={linkResolver(article)}
                  title={!isEmpty(get(article, 'title', [])) && RichText.asText(get(article, 'title', []))}
                  description={!isEmpty(get(article, 'short_description', [])) && RichText.render(get(article, 'short_description', []), linkResolver)}
                  src={get(article, 'image.url', '')}
                />
              ))}
            </List>
          );
        }}
      </Query>
  </>
);
