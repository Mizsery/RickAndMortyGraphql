import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

interface FilterSelectProps {
  value: string;
  values: string[];
  type: string;
  setValue: (type: string, value: string) => void;
  placeholder: string;
  disable?: boolean;
}

export const FilterSelect = (
  { value, values, type, setValue, placeholder, disable }: FilterSelectProps) => {
  const isMobile = useMediaQuery(`(max-width: 500px)`);
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption()
  });

  const options = values.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(type, val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label={type.toUpperCase()}
          component='button'
          w='200px'
          type='button'
          size={isMobile ? 'xs' : 'md'}
          radius='md'
          variant='filled'
          pointer
          disabled={disable}
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents='none'
        >
          {value || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
