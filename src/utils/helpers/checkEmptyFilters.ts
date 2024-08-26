export const checkEmptyFilters = (filters: object) => Object.values(filters).every((value) => value === '' || value === 1);
