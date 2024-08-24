import { gql } from '@apollo/client';

import type { Character } from '@/@types/api';

export interface GetCharacter {
  character: Character
}

export const GET_CHARACTER = gql`
  query getCharacter ($id: ID!) {
  character (id: $id) {
    id
    name
    image
    status
    species
    type
    gender
    origin {
      name
      type
      dimension
    }
    location {
      name
      type
      dimension
    }
    episode {
      id
      name
      episode
      air_date
    }
  }
}
`;
