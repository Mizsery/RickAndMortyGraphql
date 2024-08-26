import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CustomLoader } from '@components/CustomLoader/CustomLoader';
import { ErrorMessage } from '@components/ErrorMessage/ErrorMessage';
import { Grid, Image, Stack, Text, Title } from '@mantine/core';

import { InfoContainer } from '@/components/InfoContainer/InfoContainer';
import { InfoGridContainer } from '@/components/InfoGridContainer/InfoGridContainer';
import type { GetLocation } from '@/utils/graphql/requests';
import { GET_LOCATION } from '@/utils/graphql/requests';

export const Location = () => {
  const { id } = useParams();

  const { data, loading, error, refetch }
   = useQuery<GetLocation, { id: number | string }>(GET_LOCATION, {
     variables: {
       id: id !== undefined ? id : ''

     }
   });

  if (loading) return <CustomLoader />;
  if (error) return <ErrorMessage refetch={refetch} error={error} />;

  const location = data?.location;

  return (
    <>
      {
        location && (
          <Stack>
            <InfoContainer
              dividerTitle='Characters who have been last seen in the location'
              length={location.residents.length}
            >
              <Title order={3}>{location.name}</Title>
              <Text component='p'>Location type: <br /> {location.type}</Text>
              <Text component='p'>Dimension: <br /> {location.dimension}</Text>
            </InfoContainer>

            <Grid>
              {location && location.residents.map((character) => (
                <InfoGridContainer key={character.id} type='characters' id={character.id} centered>
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
