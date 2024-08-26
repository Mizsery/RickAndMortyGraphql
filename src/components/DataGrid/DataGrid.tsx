import { Link } from 'react-router-dom';
import { Card, Grid, Image, Stack, Text, Title } from '@mantine/core';

import { CenterPagination } from '../CenterPagination/CenterPagination';

import type { DataType, Info } from '@/@types/api';

interface DataGridProps<T> {
  setPages: (page: number) => void;
  image?: boolean;
  currentPage: number;
  data: {
    info: Info;
    results: T[]
  };
  type: 'locations' | 'characters' | 'episodes'
  totalPages: number;
  textComponents: {
    text: string;
    type: string;
    center?: boolean;
  }[];
}

export const DataGrid = <T extends DataType>(
  { setPages, data, currentPage, type, totalPages, textComponents, image }:
  DataGridProps<T>) => {
  return (
    <>
      <Grid>
        {data.results.map((field) => (
          <Grid.Col key={field.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Link to={`/${type}/${field.id}`}>

              <Card shadow='sm' padding='md' radius='md' withBorder h='100%'>
                <Stack align='center'justify='center'>
                  <Title order={3}>{field.name}</Title>
                  {image && <Image h={300} w={300} radius='sm' src={field.image} alt={field.name} />}
                  {
                    textComponents.map((component) => (
                      field[component.type] && (
                        <Text
                          component='p'
                          ta={component.center ? 'center' : undefined}
                          key={component.type}
                        >{component.text} {field[component.type]}
                        </Text>
                      )
                    ))
                  }
                </Stack>
              </Card>

            </Link>
          </Grid.Col>
        ))}
      </Grid>
      {data.info.pages > 1
      && (
        <CenterPagination
          total={totalPages}
          currentPage={currentPage}
          setPages={setPages}
        />
      )}
    </>
  );
};
