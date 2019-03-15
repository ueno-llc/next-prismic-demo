
import gql from 'graphql-tag';

export const headerNavigation = gql`
  query headerNavigation($lang: String!) {
    allHomepages(lang: $lang) {
      edges {
        node {
          header_navigation {
            ... on HomepageHeader_navigation {
              link_title
              header_link {
                __typename
              	... on  Custom_page {
                  _meta {
                    uid
                  }
                }
                ... on Homepage {
                   _meta {
                    uid
                  }
                }
                ... on About {
                  _meta {
                    uid
                  }
                }
               ... on _ExternalLink {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`