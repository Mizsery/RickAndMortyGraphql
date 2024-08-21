import { useQuery } from '@apollo/client';
import { ThemeButton } from '@components/ThemeButton/ThemeButton';
import clsx from 'clsx';

import styles from './Home.module.scss';

import { GET_CHARACTERS } from '@/utils/graphql/api';

interface HomeProps {
  className?: string;
}

export const Home = ({ className }: HomeProps) => {
  const { data, loading, error } = useQuery(GET_CHARACTERS);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div className={clsx(styles, className)}> 
      <img src='/src/assets/Rick_and_Morty.svg' alt='' />
      <ThemeButton />
      <h1>Rick and Morty</h1>
      <div className={styles.title}>
        {
          data.characters.results.map((character) => (
            <div key={character.id} className={styles.title}>
              <h3>{character.name}</h3>
              <img src={character.image} alt={character.name} />
              <p>{character.species}</p>
              <p>{character.type}</p>
              <p>{character.status}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};
