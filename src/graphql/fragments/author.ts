import gql from 'graphql-tag';

export const AuthorFragment = gql`
  fragment AuthorFragment on Author {
    name
    bio
    image
    _meta {
      id
      uid
    }
  }
`;