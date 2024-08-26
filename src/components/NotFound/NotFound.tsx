import { useNavigate } from 'react-router-dom';
import { Button, Stack, Text } from '@mantine/core';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Stack
      bg='var(--mantine-color-body)'
      align='center'
      justify='center'
      gap='lg'
    >
      <Text size='lg' ta='center'>
        Page doesn`t exist
      </Text>

      <Button
        variant='transparent'
        color='teal'
        size='lg'
        radius='lg'
        onClick={() => navigate('/')}
      >
        Go to home
      </Button>
    </Stack>
  );
};
