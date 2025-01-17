import React from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';

interface Option {
    value: string | number;
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
            // styles={{
            //     control: (baseStyles, state) => ({
            //         ...baseStyles,
            //         borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb',
            //         boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
            //         backgroundColor: isDisabled ? '#f3f4f6' : 'white',
            //         '&:hover': {
            //             borderColor: state.isFocused ? '#3b82f6' : '#e5e7eb'
            //         }
            //     }),
            //     option: (baseStyles, state) => ({
            //         ...baseStyles,
            //         backgroundColor: state.isSelected
            //             ? '#3b82f6'
            //             : state.isFocused
            //                 ? '#e5e7eb'
            //                 : 'transparent',
            //         color: state.isSelected ? 'white' : 'black',
            //         cursor: isDisabled ? 'not-allowed' : 'pointer',
            //         '&:active': {
            //             backgroundColor: '#3b82f6'
            //         }
            //     }),
            //     placeholder: (baseStyles) => ({
            //         ...baseStyles,
            //         color: isDisabled ? '#9ca3af' : '#6b7280'
            //     }),
            //     singleValue: (baseStyles) => ({
            //         ...baseStyles,
            //         color: isDisabled ? '#9ca3af' : '#000000'
            //     }),
            //     multiValue: (baseStyles) => ({
            //         ...baseStyles,
            //         opacity: isDisabled ? 0.6 : 1
            //     })
            // }}
        />
    );
};

export default CustomSelect;
