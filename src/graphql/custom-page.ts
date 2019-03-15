
import gql from 'graphql-tag';

export const customPage = gql`
  query customPage($uid: String!, $lang: String!) {
    custom_page(uid: $uid, lang: $lang) {
      title
      subheading
      text
      body {
        __typename
        ... on Custom_pageBodyText {
          type
          label
          primary {
            text
          }
        }
        ... on Custom_pageBodyImage {
          type
          label
          primary {
            image
            caption
          }
        }
        ... on Custom_pageBodyVideo {
          type
          label
          primary {
            video {
              ... on _FileLink {
                name
                url
                size
              }
            }
            caption
          }
        }
        ... on Custom_pageBodyProfiles {
          type
          label
          primary {
            profiles_title
          }
          fields {
            profile_link {
              ... on Author {
                name
                image
                bio
              }
            }
          }
        }
        ... on Custom_pageBodyContact_form {
          type
          label
          primary {
            target_url
            response_message_title
            response_message_text
          }
        }
        ... on Custom_pageBodyPicture {
          type
          label
          primary {
            image
          }
        }
        ... on Custom_pageBodyAhn_module {
          type
          label
          primary {
            the_title
            sub_title
            animation
          }
        }
      }

      meta_title
      meta_description
      _meta {
        id
        uid
      }
    }
  }
`