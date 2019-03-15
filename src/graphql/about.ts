
import gql from 'graphql-tag';

export const aboutPage = gql`
  query aboutPage($lang: String!) {
    allAbouts(lang: $lang) {
      edges {
        node {
          title
          subheading
          title_seo
          description_seo
          text
          people_title
          people {
            person {
              ... on Author {
                name
                bio
                image
              }
            }
          }
        }
      }
    }
  }
`