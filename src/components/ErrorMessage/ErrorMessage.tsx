import type { ApolloError, ApolloQueryResult } from '@apollo/client';
import { Button, Stack, Text } from '@mantine/core';

interface ErrorMessageProps {
  error: ApolloError;
  refetch: () => void
}

export const ErrorMessage = ({ error, refetch }: ErrorMessageProps) => (
  <Stack
    bg='var(--mantine-color-body)'
    align='center'
    justify='center'
    gap='lg'
  >
    <Text size='lg' ta='center'>
      Something went wrong
    </Text>
    <Text size='lg' ta='center'>
      {error.message}
    </Text>
    <Button
      variant='transparent'
      color='teal'
      size='lg'
      radius='lg'
      onClick={() => refetch()}
    >
      Refetch
    </Button>
  </Stack>
);
