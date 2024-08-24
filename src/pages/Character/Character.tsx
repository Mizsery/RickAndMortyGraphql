import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CustomLoader } from '@components/CustomLoader/CustomLoader';
import { ErrorMessage } from '@components/ErrorMessage/ErrorMessage';
import { Box, Card, Container, Divider, Flex, Grid, Group, Image, Stack, Text, Title } from '@mantine/core';

import { LocationContainer } from './components/LocationContainer';

import styles from './Character.module.scss';

import type { GetCharacter } from '@/utils/graphql/requests';
import { GET_CHARACTER } from '@/utils/graphql/requests';

export const Character = () => {
  const { id } = useParams();

  if (!id) return <CustomLoader />;

  const { data, loading, error, refetch } = useQuery<GetCharacter, { id: number | string }>(GET_CHARACTER, {
    variables: {
      id
    }
  });

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage refetch={refetch} error={error} />;

  const character = data?.character;

  return (
    <Stack>
      {
        character && (
          <>
            <Flex gap='xl' justify='start' align='flex-start' className={styles.characterContainer}>
              <Box>
                <Image h={300} w={300} radius='sm' src={character.image} alt={character.name} />
              </Box>
              <Flex
                gap='sm'
                justify='flex-start'
                align='flex-start'
                direction='column'
                wrap='wrap'
              >
              <Title order={3}>{character.name}</Title>
                <Text component='p'>Species: <br /> {character.species}</Text>
                {character.type && <Text component='p'>Type: <br /> {character.type}</Text>}
                <Text component='p'>Status: <br /> {character.status}</Text>
                <Text component='p'>Gender: <br /> {character.gender}</Text>
              </Flex>
              <LocationContainer title='Origin' location={character.origin} />
              <LocationContainer title='Last' location={character.location} />

            </Flex>

            <Divider my='sm' color='teal.6' />
            <Title order={2}>Episodes: {character.episode.length}</Title>

            <Grid>
              {character && character.episode.map((episode) => (
                <Grid.Col key={episode.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                  <Link to={`/episodes/${episode.id}`}>
                    <Card shadow='sm' padding='md' radius='md' withBorder h='100%'>
                      <Text component='p' fw={700}>Episode name: {episode.name}</Text>
                      <Text component='p'>Episode: {episode.episode}</Text>
                      <Text component='p'>Air date: {episode.air_date}</Text>
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
