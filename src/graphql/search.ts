import gql from 'graphql-tag';

export const search = gql`
  query search($q: String) {
    _allDocuments(type_in: ["about", "article", "custom_page"], fulltext: $q, lang: "en-us") {
      edges {
        node {
          _meta {
            uid
            type
          }
          ... on Article {
            title
            short_description
          }

          ... on Custom_page {
            title
            text
          }

          ... on About {
            title
            description_seo
          }
        }
      }
    }
  }
`;