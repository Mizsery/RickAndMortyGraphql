import { gql } from '@apollo/client';

export const GET_EPISODES = gql`
  query getEpisodes ($page: Int, $name: String, $episode: String) {
  episodes (page: $page, filter: {name: $name, episode: $episode}) {
    info {
      pages
    }
    results {
      id
      name
      episode
      air_date
    }
  }
}
`;
