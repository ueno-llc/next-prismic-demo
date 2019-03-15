
import gql from 'graphql-tag';

export const product = gql`
  query product($uid: String!, $lang: String!) {
    product(uid: $uid, lang: $lang){
      name
      description
      hero_image
      meta_title
      meta_image
      meta_description
      body {
       __typename
 			 ... on ProductBodyGallery {
          type
          label
          primary {
            title
          }
          fields {
            image
            caption
            alt_text
          }
        }
      }
      _meta {
        id
        uid
      }
    }
  }
`

export const products = gql`
  query products($lang: String!) {
    allProducts(lang: $lang){
      edges {
        node {
          name
          description
          hero_image
          text
          meta_title
          meta_description
          meta_image
          _linkType
          _meta {
            id
            uid
          }
        }
      }
    }
  }
`