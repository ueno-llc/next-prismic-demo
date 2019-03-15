import gql from 'graphql-tag';

import { AuthorFragment } from './author';

export const ArticleFragment = gql`
  fragment ArticleFragment on Article {
    title
    short_description
    _meta {
      id
      uid
    }
    author {
      ...AuthorFragment
    }
    image
    body {
        __typename

        ... on ArticleBodyText {
          type

          label
          primary {
            text
          }
        }

        ... on ArticleBodyImage {
          type
          label
          primary {
            image
            caption
          }
        }

        ... on ArticleBodyTweets {
          type
          fields {
            tweet
          }
        }

        ... on ArticleBodyQuote {
          type
          label
          primary {
            quote
          }
        }
      }
  }
  ${AuthorFragment}
`;