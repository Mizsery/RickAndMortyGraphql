import { Box, Divider, Flex, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface InfoContainerProps {
  children: React.ReactNode;
  image?: React.ReactNode;
  select?: React.ReactNode;
  dividerTitle: string;
  length: number;
}

export const InfoContainer = (
  { children, dividerTitle, length, image, select }: InfoContainerProps) => {
  const isMobile = useMediaQuery(`(max-width: 500px)`);

  return (
    <>
      <Flex gap='xl' justify={isMobile && image ? 'center' : 'flex-start'} align='flex-start' wrap='wrap'>
        {image && <Box>{image}</Box>}
        <Flex
          gap='md'
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
