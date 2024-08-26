import { Center, Pagination } from '@mantine/core';

interface CenterPaginationProps {
  total: number;
  currentPage: number;
  setPages: (page: number) => void;
}

export const CenterPagination = ({ total, currentPage, setPages }: CenterPaginationProps) => (
  <Center p='lg'>
    <Pagination
      value={currentPage}
      onChange={(page) => setPages(page)}
      total={total}
      color='teal.6'
    />
  </Center>
);
