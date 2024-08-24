import { Combobox, Input, InputBase, useCombobox } from '@mantine/core';

interface FilterSelectProps {
  value: string;
  values: string[];
  type: string;
  setValue: (type: string, value: string) => void;
  placeholder: string;
}

export const FilterSelect = ({ value, values, type, setValue, placeholder }: FilterSelectProps) => {
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
          component='button'
          type='button'
          size='md'
          radius='md'
          variant='filled'
          pointer
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
