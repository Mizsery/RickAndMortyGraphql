import { gql } from '@apollo/client';

export const GET_LOCATIONS = gql`
  query getLocations ($page: Int, $name: String, $type: String, $dimension: String) {
  locations(page: $page, filter: {name: $name, type: $type, dimension: $dimension}) {
    info {
      pages
    }
    results {
      id
      name
      type
      dimension
    }  
  }

}
`;
