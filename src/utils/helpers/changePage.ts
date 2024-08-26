export const handleChangePage = <T extends object>
(
  page: number,
  setFilters: React.Dispatch<React.SetStateAction<T>>,
  filters: T
) => {
  setFilters({ ...filters, page });
};
