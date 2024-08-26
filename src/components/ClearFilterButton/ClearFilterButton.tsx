import { Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface ClearFilterButtonProps {
  handleClearFilters: () => void;
  disabled: boolean;
}

export const ClearFilterButton = ({ handleClearFilters, disabled }: ClearFilterButtonProps) => {
  const isMobile = useMediaQuery(`(max-width: 500px)`);

  return (
    <Button
      size={isMobile ? 'xs' : 'md'}
      radius='md'
      variant='outline'
      color='teal.6'
      onClick={handleClearFilters}
      disabled={disabled}
    >
      Clear Filters
    </Button>
  );
};
