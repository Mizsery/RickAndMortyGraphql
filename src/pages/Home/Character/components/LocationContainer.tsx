import { Link } from 'react-router-dom';
import { Flex, Text, Title } from '@mantine/core';

import styles from './LocationContainer.module.scss';

import type { Location } from '@/@types/api';

interface LocationContainerProps {
  title: 'Origin' | 'Last';
  location: Location;
}

export const LocationContainer = ({ location, title }: LocationContainerProps) => {
  const locationLink = location.name === 'unknown' ? '' : location.id;

  return (
    <Link to={`/locations/${locationLink}`} className={styles.link}>
      <Flex
        gap='sm'
        justify='flex-start'
        align='flex-start'
        direction='column'
        wrap='wrap'
      >
        { title === 'Origin' ? <Title order={3}>Origin Location</Title> : <Title order={3}>Last known Location</Title>}
        {location.name && <Text fw={700}>Location name: <br /> {location.name}</Text>}
        {location.type && <Text>Location type: <br /> {location.type}</Text>}
        {location.dimension && <Text>Dimension: <br /> {location.dimension}</Text>}
      </Flex>
    </Link>
  );
};
