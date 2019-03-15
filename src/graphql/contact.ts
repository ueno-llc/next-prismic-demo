
import gql from 'graphql-tag';

export const contactPage = gql`
  query contactPage($lang: String!) {
    allContacts(lang: $lang) {
      edges {
        node {
          title
          subheading
          text
          title_seo
          description_seo
          _linkType
        }
      }
    }
  }
`