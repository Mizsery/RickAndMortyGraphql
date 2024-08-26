export const handleChangeFilters = <T extends object>
(
  type: string,
  value: string,
  setFilters: React.Dispatch<React.SetStateAction<T>>,
  filters: T
) => {
  setFilters({ ...filters, page: 1, [type]: value });
};
