import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CustomLoader } from '@components/CustomLoader/CustomLoader';
import { ErrorMessage } from '@components/ErrorMessage/ErrorMessage';
import { Grid, Image, Stack, Text, Title } from '@mantine/core';

import { InfoContainer } from '@/components/InfoContainer/InfoContainer';
import { InfoGridContainer } from '@/components/InfoGridContainer/InfoGridContainer';
import type { GetEpisode } from '@/utils/graphql/requests';
import { GET_EPISODE } from '@/utils/graphql/requests';

export const Episode = () => {
  const { id } = useParams();

  const { data, loading, error, refetch }
   = useQuery<GetEpisode, { id: number | string }>(GET_EPISODE, {
     variables: {
       id: id !== undefined ? id : ''
     }
   });

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage refetch={refetch} error={error} />;

  const episode = data?.episode;

  return (
    <>
      {
        episode && (
          <Stack>
            <InfoContainer
              dividerTitle='Characters in the episode'
              length={episode.characters.length}
            >
              <Title order={3}>{episode.name}</Title>
              <Text component='p'>Episode: <br /> {episode.episode}</Text>
              <Text component='p'>Episode air date: <br /> {episode.air_date}</Text>
            </InfoContainer>

            <Grid>
              {episode && episode.characters.map((character) => (
                <InfoGridContainer key={character.id} id={character.id} type='characters' centered>
                  <Title order={3}>{character.name}</Title>
                  <Image h={300} w={300} radius='sm' src={character.image} alt={character.name} />
                </InfoGridContainer>
              ))}
            </Grid>
          </Stack>
        )
      }
    </>
  );
};
