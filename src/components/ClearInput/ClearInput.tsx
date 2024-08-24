import { CloseButton, TextInput } from '@mantine/core';

interface ClearInputProps {
  value: string;
  type: string;
  changeInput: (type: string, value: string) => void;
}

export const ClearInput = ({ value, type, changeInput }: ClearInputProps) => (
  <TextInput
    label={type.toUpperCase()}
    placeholder={`Enter ${type}`}
    size='md'
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
