
import gql from 'graphql-tag';
import { ArticleFragment } from './fragments/article';

export const homePage = gql`
  query homePage($lang: String!) {
    allHomepages(lang: $lang) {
      edges {
        node {
          _meta {
            id
          }
          meta_title
          meta_description
          carousel {
            title
            text
            color
          }
          column_title
          column_subheading
          content_columns {
            title
            text
          }
          articles_title
          articles_subheading
          featured_articles {
            article {
              ...ArticleFragment
            }
          }
        }
      }
    }
  }
  ${ArticleFragment}
`