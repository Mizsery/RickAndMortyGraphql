import { CloseButton, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface ClearInputProps {
  value: string;
  type: string;
  changeInput: (type: string, value: string) => void;
}

export const ClearInput = ({ value, type, changeInput }: ClearInputProps) => {
  const isMobile = useMediaQuery(`(max-width: 500px)`);

  return (
    <TextInput
      label={type.toUpperCase()}
      placeholder={`Enter ${type}`}
      size={isMobile ? 'xs' : 'md'}
      variant='filled'
      radius='md'
      value={value}
      onChange={(event) => changeInput(type, event.currentTarget.value)}
      rightSectionPointerEvents='all'

      rightSection={(
        <CloseButton
          aria-label='Clear'
          onClick={() => changeInput(type, '')}
          style={{ display: value ? undefined : 'none' }}
        />
      )}
    />
  );
};
