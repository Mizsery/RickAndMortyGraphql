import { Button } from '@mantine/core';

interface ClearFilterButtonProps {
  handleClearFilters: () => void;
}

export const ClearFilterButton = ({ handleClearFilters }: ClearFilterButtonProps) => (
  <Button
    size='md'
    radius='md'
    variant='outline'
    color='teal.6'
    onClick={handleClearFilters}
  >
    Clear Filters
  </Button>
);
