import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query getCharacters {
    characters(page: 1, filter: {}) {
    results {
      id
      name
      species
      type
      image
      episode {
        name
        air_date
      }
      status
    }
  }
}
`;
