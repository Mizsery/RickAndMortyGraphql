import internal from 'node:stream';

interface Character {
  id: string;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
  created: string
}

interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  created: string
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
  created: string
}

interface FilterCharacter {
  page: number;

  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
}

interface FilterLocation {
  page: number;

  name: string;
  type: string;
  dimension: string;
}

interface FilterEpisode {
  page: number;

  name: string;
  episode: string
}

interface Info {
  count: number;
  pages: number;
  next: number;
  prev: number;
}

interface Characters {
  characters: {
    info: Info;
    results: Character[];
  }
}

interface Location {
  location: {
    info: Info;
    results: Location[];
  }
}

interface Episodes {
  episodes: {
    info: Info;
    results: Episode[];
  }
}
