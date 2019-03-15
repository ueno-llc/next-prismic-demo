
import gql from 'graphql-tag';
import { ArticleFragment } from './fragments/article';


export const article = gql`
  query article($uid: String!, $lang: String!) {
    article(uid: $uid, lang: $lang) {
     ...ArticleFragment
    }
  }
  ${ArticleFragment}
`

export const articles = gql`
  query articles($lang: String!) {
    allArticles(lang: $lang) {
      edges {
        node {
          ...ArticleFragment
        }
      }
    }
  }
  ${ArticleFragment}
`