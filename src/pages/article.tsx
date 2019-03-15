import { Article as ArticleWrapper } from 'components/article/Article';
import { Author } from 'components/author/Author';
import { Heading } from 'components/heading/Heading';
import { Segment } from 'components/segment/Segment';
import { Slices } from 'containers/slices/Slices';
import { article as articleQuery } from 'graphql/articles';
import { get } from 'lodash';
import { NextDocumentContext } from 'next/document';
import Error from 'next/error';
import { RichText } from 'prismic-reactjs';
import React from 'react';
import { Query } from 'react-apollo';
import Helmet from 'react-helmet';

interface IProps {
  uid: string;
  lang: string;
}

const Article = ({ uid }: IProps) => (
  <>
    <Helmet title="Single article" />

    <Segment>
      <Query
        query={articleQuery}
        variables={{
          uid,
          lang: 'en-us',
        }}
      >
        {({ loading, error, data: { article = {} } }) => {
          if (error) {
            return <div>Error</div>;
          }

          if (!article && !loading) {
            return <Error statusCode={404} />;
          }

          return (
            <ArticleWrapper>
              <>
                {article && article.author && (
                  <Author
                    key="author"
                    name={RichText.asText(get(article, 'author.name', ''))}
                    bio={RichText.asText(get(article, 'author.bio', ''))}
                    image={get(article, 'author.image.thumb', '')}
                    isLoading={loading}
                  />
                )}
                {article.title && (
                  <Heading key="heading" isLoading={loading}>
                    {RichText.asText(article.title)}
                  </Heading>
                )}
                <Slices data={article.body || []} />
              </>
            </ArticleWrapper>
          );
        }}
      </Query>
    </Segment>
  </>
);

Article.getInitialProps = async (context: NextDocumentContext) => {
  const { uid } = context.query;
  return { uid };
};

export default Article;
