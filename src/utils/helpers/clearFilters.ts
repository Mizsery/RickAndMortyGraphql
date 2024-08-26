export const handleClearFilters = <T extends object>
(setFilters: React.Dispatch<React.SetStateAction<T>>) => {
  setFilters((prevState) => ({
    ...Object.fromEntries(Object.keys(prevState).map((key) => [key, ''])) as T,
    page: 1
  }));
};
