import React from 'react';
import { DataSlotProps, Option } from './types';
import Select from './../ui/Select';
import FieldMapping from './FieldMapping';
import Rules from './Rules';

const formatOptions = (options: Option[]) =>
    options.map(opt => ({
        value: opt.value,
        label: opt.name
    }));

const DataSlot: React.FC<DataSlotProps> = ({
    type,
    placeholder,
    multiple,
    options = [],
    labels,
    value,
    onChange,
    // map field prop
    mapping,
    // rule props
    ruleColumns,
    onLHSChange,
}) => {
    
    // Handles map config fields
    if (type === "map_v2" && mapping) {
        return (
            <FieldMapping
                mapping={ mapping }
                value={ value }
                onChange={ onChange }
            />
        );
    }

    // Handles rule_engine field
    if (type === "rule_engine") {
        return (
            <Rules
                logic={value?.logic}
                conditions={value?.conditions}
                onChange={(k, v) => onChange({ ...value, [k]: v })}
                options={options}
                ruleColumns={ruleColumns}
                onLHSChange={onLHSChange}
            />
        );
    }

    // Handles 'Select' fields
    if (type === 'select') {
        return (
            <Select
                options={formatOptions(options)}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                isMulti={multiple}
                className="w-full"
            />
        );
    }
    // Handles 'Text' fields
    if (type === 'textarea') {
        return (
            <textarea
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder={placeholder || 'Type something...'}
                value={value || ''}
                onChange={e => onChange(e.target.value)}
            />
        );
    }

    return (
        // Handles input fields with different type like date, number, etc
        <input
            type={type}
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder || 'Type something...'}
            value={value || ''}
            onChange={e => onChange(e.target.value)}
        />
    );
};

export default DataSlot;