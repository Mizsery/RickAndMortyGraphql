import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CustomLoader } from '@components/CustomLoader/CustomLoader';
import { ErrorMessage } from '@components/ErrorMessage/ErrorMessage';
import { Card, Divider, Flex, Grid, Image, Stack, Text, Title } from '@mantine/core';

import type { GetEpisode } from '@/utils/graphql/requests';
import { GET_EPISODE } from '@/utils/graphql/requests';


export const Episode = () => {
  const { id } = useParams();

  if (!id) return <CustomLoader />;

  const { data, loading, error, refetch } = useQuery<GetEpisode, { id: number | string }>(GET_EPISODE, {
    variables: {
      id
    }
  });

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage refetch={refetch} error={error} />;

  const episode = data?.episode;

  return (
    <Stack>
      {
        episode && (
          <>
            <Flex gap='xl' justify='start' align='flex-start'>
             
              <Flex
                gap='sm'
                justify='flex-start'
                align='flex-start'
                direction='column'
                wrap='wrap'
              >
              <Title order={3}>{episode.name}</Title>
                <Text component='p'>Episode: <br /> {episode.episode}</Text>
                <Text component='p'>Episode air date: <br /> {episode.air_date}</Text>
              </Flex>

            </Flex>

            <Divider my='sm' color='teal.6' />
            <Title order={2}> Characters in the series: {episode.characters.length}</Title>

            <Grid>
              {episode && episode.characters.map((character) => (
                <Grid.Col key={character.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <Link to={`/characters/${character.id}`}>
                  <Card shadow='sm' padding='md' radius='md' withBorder h='100%'>
                    <Stack align='center'justify='center'>
                      <Title order={3}>{character.name}</Title>
                        <Image h={300} w={300} radius='sm' src={character.image} alt={character.name} />
                    </Stack>
                  </Card>
                  </Link>
                </Grid.Col> 
              ))}
            </Grid>
          </>
        )
      }

    </Stack>
  );
};
