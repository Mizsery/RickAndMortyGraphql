import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';

import { Router } from './Router.tsx';
import { colorSchemeManager, theme } from './theme.ts';

import { client } from '@/utils/graphql/client.ts';

export const App = () => {
  return (
    <MantineProvider defaultColorScheme='auto' theme={theme} colorSchemeManager={colorSchemeManager} withGlobalClasses>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </MantineProvider>
  );
};
