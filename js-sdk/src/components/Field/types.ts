export interface Option {
    name: string;
    value: string | number;
}

export interface Label {
    name: string;
    value: string;
    multiple?: boolean;
}

export interface SelectProps {
    placeholder?: string;
    multiple?: boolean;
    value: string | number | (string | number)[];
    onChange: (event: React.MouseEvent | null, value: any) => void;
    options?: Option[];
    className?: string;
}

export interface DataSlotProps {
    type: string;
    placeholder?: string;
    multiple?: boolean;
    options?: Option[];
    labels?: Label[];
    value: any;
    onChange: (value: any) => void;
    mapping?: MappingConfig
}

export interface FieldProps {
    type: string;
    name: string;
    description?: string;
    placeholder?: string;
    options?: Option[];
    labels?: Label[];
    required?: boolean;
    multiple?: boolean;
    value: any;
    onChange: (value: any) => void;
    mapping?: MappingConfig;
}

export interface MappingOption {
    value: string | number;
    name: string;
}

export interface MappingSide {
    name: string;
    options?: MappingOption[];
    multiple?: boolean; // to allow multiple selections
}

export interface MappingConfig {
    lhs: MappingSide;
    rhs: MappingSide;
}

export interface FieldMappingProps {
    mapping: MappingConfig;
    value: Record<string, any>;
    onChange?: (value: Record<string, any>) => void;
}
