import React, { useState } from 'react';
import { FaArrowRightArrowLeft, FaPlus, FaX } from 'react-icons/fa6';
import Select from './../ui/Select';
import { FieldMappingProps, MappingOption } from './types';

const convertOptions = (options?: MappingOption[]): { value: string | number; label: string; }[] => {
    if (!options) return [];
    return options.map(opt => ({
        value: opt.value,
        label: opt.name
    }));
};

const FieldMapping: React.FC<FieldMappingProps> = ({
    mapping,
    value,
    onChange
}) => {
    const [newLHS, setNewLHS] = useState<string | number>("");
    const [newRHS, setNewRHS] = useState<any>(
        // if mapping has multiple: true, initialize with []
        mapping?.rhs?.options && mapping?.rhs?.options?.length && mapping?.rhs?.multiple ? [] : ""
    );

    const addField = () => {
        if (!newLHS || !newRHS) return;
        const newValue = { ...value };
        newValue[newLHS] = newRHS;

        onChange?.(newValue);

        setNewLHS("");
        setNewRHS(mapping?.rhs?.options && mapping?.rhs?.options?.length && mapping?.rhs?.multiple ? [] : "");
    };

    const removeField = (lhs: string) => {
        const newValue = { ...value };
        delete newValue[lhs];
        onChange?.(newValue);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Header: LHS - RHS */}
            <div className="flex flex-row items-center gap-8">
                <span className="flex-1 text-sm font-semibold">{mapping?.lhs?.name}</span>
                <FaArrowRightArrowLeft className="text-transparent" />
                <span className="flex-1 text-sm font-semibold">{mapping?.rhs?.name}</span>
                <button className="w-8 h-8 invisible">
                    <FaX />
                </button>
            </div>

            {/* Existing Mappings */}

            {/* 
                // `value`
                {
                    "k1": "v1",
                    "k2": "v2"
                }
            */}

            {Object.entries(value || {}).map(([lhs, rhs]) => (
                <div key={lhs} className="flex flex-row items-center gap-8">
                    <div className="flex-1">
                        <Select
                            options={convertOptions(mapping?.lhs?.options)}
                            value={lhs}
                            onChange={() => {}}
                            placeholder="Select"
                            isMulti={false}
                            className="w-full"
                            isDisabled={true}
                        />
                    </div>
                    <FaArrowRightArrowLeft className="text-gray-400" />
                    <div className="flex-1">
                        {mapping?.rhs?.options ? (
                            <Select
                                options={convertOptions(mapping?.rhs?.options)}
                                value={rhs}
                                onChange={(v) => {
                                    // Handle both array and single value cases
                                    const newValue = Array.isArray(v) ? v : v?.value || v;
                                    onChange?.({ ...value, [lhs]: newValue });
                                }}
                                placeholder="Select"
                                isMulti={mapping.rhs.multiple}
                                className="w-full"
                            />
                        ) : (
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Value"
                                value={rhs || ""}
                                onChange={(e) => onChange?.({ ...value, [lhs]: e.target.value })}
                            />
                        )}
                    </div>
                    <button
                        onClick={() => removeField(lhs)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-full"
                    >
                        <FaX />
                    </button>
                </div>
            ))}
            {/* New Mapping Input */}
            <div className="flex flex-row items-center gap-8">
                <div className="flex-1">
                    <Select
                        options={convertOptions(mapping?.lhs?.options)}
                        value={newLHS}
                        onChange={setNewLHS}
                        placeholder="Select"
                        className="w-full"
                    />
                </div>
                <FaArrowRightArrowLeft className="text-gray-400 opacity-50" />
                <div className="flex-1">
                    {mapping?.rhs?.options ? (
                        <Select
                            options={convertOptions(mapping?.rhs?.options)}
                            value={newRHS}
                            onChange={(v) => setNewRHS(v?.value || v)}
                            placeholder="Select"
                            isMulti={mapping.rhs.multiple}
                            className="w-full"
                        />
                    ) : (
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Value"
                            value={newRHS}
                            onChange={(e) => setNewRHS(e.target.value)}
                        />
                    )}
                </div>
                <button
                    onClick={addField}
                    disabled={Object.keys(value || {}).length >= (mapping?.lhs?.options?.length || 0)}
                    className="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaPlus />
                </button>
            </div>
        </div>
    );
};

export default FieldMapping;