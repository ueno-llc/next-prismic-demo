
import gql from 'graphql-tag';

export const footerNavigation = gql`
  query footerNavigation($lang: String!) {
    allHomepages(lang: $lang) {
      edges {
        node {
          footer_navigation {
            ... on HomepageFooter_navigation {
              footer_link {
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
                ... on _FileLink {
                  url
                }
                ... on _ImageLink {
                  url
                }
              }
              link_title
            }
          }
        }
      }
    }
  }
`


