import { useQuery } from '@apollo/client';
import { Grid, Image } from '@mantine/core';
import clsx from 'clsx';

import { GET_CHARACTERS } from '../../utils/graphql/requests';

import styles from './Home.module.scss';

import type { Characters, FilterCharacter, FilterType } from '@/@types/api';

interface HomeProps {
  className?: string;
}

export const Home = ({ className }: HomeProps) => {
  const { data, loading, error } = useQuery<Characters, FilterCharacter>(GET_CHARACTERS, {
    variables: { page: 1, name: 'rick', status: '', species: '', type: '', gender: '' }
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div className={clsx(styles, className)}>

      <Grid className={styles.title}>
        {
          data?.characters.results.map((character) => (
            <Grid.Col
              span={{ base: 12, sm: 6, md: 4, lg: 3 }}
              key={character.id}
              className={styles.title}
            >
              <h3>{character.name}</h3>
              <Image h={300} w={300} src={character.image} alt={character.name} />
              <p>{character.species}</p>
              <p>{character.type}</p>
              <p>{character.status}</p>
            </Grid.Col>
          ))
        }
      </Grid>
    </div>
  );
};
