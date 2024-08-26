import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CustomLoader } from '@components/CustomLoader/CustomLoader';
import { ErrorMessage } from '@components/ErrorMessage/ErrorMessage';
import { Center, Grid, Image, Stack, Text, Title } from '@mantine/core';

import { LocationContainer } from './components/LocationContainer';

import { InfoContainer } from '@/components/InfoContainer/InfoContainer';
import { InfoGridContainer } from '@/components/InfoGridContainer/InfoGridContainer';
import type { GetCharacter } from '@/utils/graphql/requests';
import { GET_CHARACTER } from '@/utils/graphql/requests';

export const Character = () => {
  const { id } = useParams();

  const { data, loading, error, refetch }
   = useQuery<GetCharacter, { id: number | string }>(GET_CHARACTER, {
     variables: {
       id: id !== undefined ? id : ''
     }
   });

  if (loading) return <CustomLoader />;
  if (data?.character === null) return <Center><Text>Character not found</Text></Center>;
  if (error) return <ErrorMessage refetch={refetch} error={error} />;

  const character = data?.character;

  return (
    <>
      {
        character && (
          <Stack>
            <InfoContainer
              dividerTitle='Episodes'
              length={character.episode.length}
              image={<Image src={character.image} radius='md' alt={character.name} />}
              select={(
                < >
                  <LocationContainer title='Origin' location={character.origin} />
                  <LocationContainer title='Last' location={character.location} />
                </>
              )}
            >
              <Title order={3}>{character.name}</Title>
              <Text component='p'>Species: <br /> {character.species}</Text>
              {character.type && <Text component='p'>Type: <br /> {character.type}</Text>}
              <Text component='p'>Status: <br /> {character.status}</Text>
              <Text component='p'>Gender: <br /> {character.gender}</Text>
            </InfoContainer>

            <Grid>
              {character && character.episode.map((episode) => (
                <InfoGridContainer key={episode.id} id={episode.id} type='episodes'>
                  <Text component='p' fw={700}>Episode name: {episode.name}</Text>
                  <Text component='p'>Episode: {episode.episode}</Text>
                  <Text component='p'>Air date: {episode.air_date}</Text>
                </InfoGridContainer>
              ))}
            </Grid>
          </Stack>
        )
      }

    </>
  );
};
