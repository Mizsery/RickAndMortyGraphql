import { Link } from 'react-router-dom';
import { Card, Grid, Stack } from '@mantine/core';

interface InfoGridContainerProps {
  children: React.ReactNode;
  centered?: boolean;
  type: 'characters' | 'locations' | 'episodes';
  id: string;
}

export const InfoGridContainer = ({ children, centered, id, type }: InfoGridContainerProps) => (
  <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
    <Link to={`/${type}/${id}`}>
      <Card shadow='sm' padding='md' radius='md' withBorder h='100%'>
        {
          centered ? (
            <Stack align='center'justify='center'>
              {children}
            </Stack>
          ) : children
        }
      </Card>
    </Link>
  </Grid.Col>
);
;
