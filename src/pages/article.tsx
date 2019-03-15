import React from 'react';
import Helmet from 'react-helmet';
import { NextDocumentContext } from 'next/document';
import { Query } from 'react-apollo';
import { RichText } from 'prismic-reactjs';
import { article } from 'graphql/articles';
import Error from 'next/error'
import { get } from 'lodash';

import { Slices } from 'containers/slices/Slices';
import { Article as ArticleWrapper } from 'components/article/Article';
import { Segment } from 'components/segment/Segment';
import { Heading } from 'components/heading/Heading';
import { Author } from 'components/author/Author';

interface IProps {
  uid: string;
  lang: string;
}

const Article = ({ uid }: IProps) => (
  <>
    <Helmet title="Single article" />

    <Segment>
      <Query query={article} variables={{
          uid,
          lang: 'en-us',
        }}>
          {({ loading, error, data: { article } }) => {
            if (error) return <div>Error</div>

            if (!article && !loading) {
              return <Error statusCode={404} />
            }

            return (
              <ArticleWrapper>
                <>
                  {article.author && (
                    <Author
                      key="author"
                      name={RichText.asText(get(article, 'author.name', ''))}
                      bio={RichText.asText(get(article, 'author.bio', ''))}
                      image={get(article, 'author.image.thumb', '')}
                      isLoading={loading}
                    />
                  )}
                  {article.title && (
                    <Heading
                      key="heading"
                      isLoading={loading}
                    >
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


Article.getInitialProps = async function (context: NextDocumentContext) {
  const { uid } = context.query
  return { uid }
}

export default Article
