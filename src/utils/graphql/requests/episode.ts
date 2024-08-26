import { gql } from '@apollo/client';

import type { Episode } from '@/@types/api';

export interface GetEpisode {
  episode: Episode
}

export const GET_EPISODE = gql`
  query getEpisode ($id: ID!) {
  episode (id: $id) {
    id
    name
    air_date
    episode
    characters {
      id
      name
      image
    }
  }
}
`;
