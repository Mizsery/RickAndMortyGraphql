import { gql } from '@apollo/client';

import type { Location } from '@/@types/api';

export interface GetLocation {
  location: Location
}

export const GET_LOCATION = gql`
  query getLocation ($id: ID!) {
  location (id: $id) {
    id
    name
    type
    dimension
    residents {
      id
      name
      image
    }
  }
}
`;
