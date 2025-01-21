import React from 'react';
import DataSlot from './DataSlot';
import { FieldProps } from './types';

const Field: React.FC<FieldProps> = ({
    type,
    name,
    description,
    placeholder,
    options,
    labels,
    required,
    multiple,
    value,
    onChange,
    // map field
    mapping,
    // rule props
    ruleColumns,
    onLHSChange,
}) => (
    <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
            {/* Show Field name, required, field description */}
            <div className="flex flex-row gap-2 items-center">
                <span className="text-gray-700 font-semibold">{name}</span>
                {!required && (
                    <span className="text-sm text-gray-500">(optional)</span>
                )}
            </div>
            {description && (
                <span className="text-sm text-gray-600">{description}</span>
            )}
        </div>

        <DataSlot
            type={type}
            placeholder={placeholder}
            multiple={multiple}
            options={options}
            labels={labels}
            value={value}
            onChange={onChange}
            // map field
            mapping={mapping}
            // rule props
            ruleColumns={ruleColumns}
            onLHSChange={onLHSChange}
        />
    </div>
);

export default Field;