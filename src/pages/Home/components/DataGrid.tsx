import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Center, Grid, Image, Pagination, Stack, Text, Title } from '@mantine/core';

import type { Characters, FilterCharacter } from '@/@types/api';
import { CustomLoader } from '@/components/CustomLoader/CustomLoader';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { GET_CHARACTERS } from '@/utils/graphql/requests';

interface DataGridProps {
  setPages: (page: number) => void;
  filters: FilterCharacter;
  debounceFilters: FilterCharacter;
}

export const DataGrid = ({ setPages, filters, debounceFilters }: DataGridProps) => {
  const { data, loading, error, refetch } = useQuery<Characters, FilterCharacter>(GET_CHARACTERS, {
    variables: {
      page: filters.page,
      name: debounceFilters.name,
      status: filters.status,
      species: debounceFilters.species,
      type: debounceFilters.type,
      gender: filters.gender
    }
  });

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage refetch={refetch} error={error} />;

  const characters = data?.characters;

  return (
    <>
      {
        characters && characters.results.length > 0
          ? (
            <>
              <Grid>
                {characters.results.map((character) => (
                  <Grid.Col key={character.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                    <Link to={`/characters/${character.id}`}>

                      <Card shadow='sm' padding='md' radius='md' withBorder h='100%'>
                        <Stack align='center'justify='center'>
                          <Title order={3}>{character.name}</Title>
                          <Image h={300} w={300} radius='sm' src={character.image} alt={character.name} />
                          <Text component='p'> Species: {character.species}</Text>
                          {character.type && (<Text component='p'>Type: {character.type}</Text>)}
                          <Text component='p'>Status: {character.status}</Text>
                        </Stack>
                      </Card>

                    </Link>
                  </Grid.Col>
                ))}
              </Grid>
              {
                characters.info.pages > 1
                  ? (
                    <Center p='lg'>
                      <Pagination
                        value={filters.page}
                        onChange={(page) => setPages(page)}
                        total={characters.info.pages}
                      />
                    </Center>
                  )
                  : null
              }
            </>
          )
          : <Center>No data</Center>
      }
    </>
  );
};
