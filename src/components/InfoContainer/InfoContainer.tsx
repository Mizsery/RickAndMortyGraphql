import { Box, Divider, Flex, Title } from '@mantine/core';

interface InfoContainerProps {
  children: React.ReactNode;
  image?: React.ReactNode;
  select?: React.ReactNode;
  dividerTitle: string;
  length: number;
}

export const InfoContainer = (
  { children, dividerTitle, length, image, select }: InfoContainerProps) => {
  return (
    <>
      <Flex gap='xl' justify='start' align='flex-start'>
        {image && <Box>{image}</Box>}
        <Flex
          gap='sm'
          justify='flex-start'
          align='flex-start'
          direction='column'
          wrap='wrap'
        >
          {children}
        </Flex>
        {select}
      </Flex>

      <Divider my='sm' color='teal.6' />
      <Title order={2}> {dividerTitle}: {length}</Title>
    </>
  );
};
