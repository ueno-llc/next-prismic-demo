import { Articles } from 'components/articles/Articles';
import { Button } from 'components/button/Button';
import { Column } from 'components/columns/Column';
import { Columns } from 'components/columns/Columns';
import { Cta } from 'components/cta/Cta';
import { Segment } from 'components/segment/Segment';
import { homePage } from 'graphql/home';
import { get, isEmpty } from 'lodash';
import Error from 'next/error';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';
import { linkResolver } from 'utils/linkResolver';
import { Hero } from './components/hero/Hero';

const Loading = () => (
  <>
    <Hero isLoading />
    <Columns isLoading />
    <Segment />
  </>
);

const Home = () => {
  return (
    <>
      <Helmet title="Home" />

      <Query query={homePage} variables={{
        lang: 'en-us',
      }}>
        {({ loading, error, data }) => {
          if (error) { return <div>Error</div>; }
          if (loading) { return <Loading />; }
          const { node: homepage } = get(data, 'allHomepages.edges', [])[0] || {};

          if (!homepage) {
            return <Error statusCode={404} />;
          }

          return (
            <>
              <Helmet
                title={RichText.asText(homepage.meta_title)}
                meta={[{ name: 'description', content: RichText.asText(homepage.meta_description)}]}
              />

              <Hero carousel={homepage.carousel} />

              <Columns
                heading={RichText.asText(homepage.column_title)}
                subline={RichText.asText(homepage.column_subheading)}
              >
                {homepage.content_columns.map((item: any, i: number) => (
                  <Column
                    key={i} // eslint-disable-line
                    title={RichText.asText(item.title)}
                    text={RichText.render(item.text, linkResolver)}
                  />
                ))}
              </Columns>

              {!isEmpty(homepage.featured_articles) && (
                <Articles
                  title={RichText.asText(homepage.articles_title)}
                  subheading={RichText.asText(homepage.articles_subheading)}
                  articles={homepage.featured_articles}
                  show={4}
                />
              )}

              <Cta>
                <p>Want to talk more.</p>
                <Button to="/contact" large>Contact us</Button>
              </Cta>
            </>
          );
        }}
      </Query>
    </>
  );
};

export default Home;
