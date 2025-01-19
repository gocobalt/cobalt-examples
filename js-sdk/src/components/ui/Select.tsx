import React from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

interface Option {
    value: string | number | boolean;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: any;
    onChange: (value: any) => void;
    placeholder?: string;
    isMulti?: boolean;
    className?: string;
    isDisabled?: boolean;
    defaultValue?: any;
}

const formatValue = (
  value: any,
  options: Option[],
  isMulti?: boolean
) => {
  if (!value) return isMulti ? [] : null;
  
  if (isMulti) {
      const valueArray = Array.isArray(value) ? value : [value];
      return options.filter(opt => valueArray.includes(opt.value));
  }
  
  return options.find(opt => opt.value === value) || null;
};

const CustomSelect: React.FC<CustomSelectProps> = ({
    options,
    value,
    onChange,
    placeholder,
    isMulti,
    className,
    isDisabled,
    defaultValue
}) => {
    const handleChange = (
        selectedOption: MultiValue<Option> | SingleValue<Option>
    ) => {
        if (isMulti) {
            const values = (selectedOption as MultiValue<Option>)
                .map(option => option.value);
            onChange(values);
        } else {
            const value = (selectedOption as SingleValue<Option>)?.value;
            onChange(value ?? '');
        }
    };

    const formattedValue = formatValue(value, options, isMulti);

    return (
        <Select
            className={className}
            options={options}
            value={formattedValue}
            defaultValue={defaultValue ? formatValue(defaultValue, options, isMulti) : undefined}
            onChange={handleChange}
            placeholder={placeholder}
            isMulti={isMulti}
            isDisabled={isDisabled}
        />
    );
};

export default CustomSelect;
