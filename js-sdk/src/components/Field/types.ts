export interface Option {
    name: string;
    value: string | number | boolean;
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
    labels?: Option[]
    value: any;
    onChange: (value: any) => void;
    mapping?: MappingConfig;
    ruleColumns?: Record<string, RuleColumn>;
    onLHSChange?: (value: string) => void;
}

export interface FieldProps {
    type: string;
    name: string;
    description?: string;
    placeholder?: string;
    options?: Option[];
    labels?: Option[];
    required?: boolean;
    multiple?: boolean;
    value: any;
    onChange: (value: any) => void;
    mapping?: MappingConfig;
    ruleColumns?: Record<string, RuleColumn>;
    onLHSChange?: (value: string) => void;
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


export interface RuleColumn {
    rhs: {
        name: string;
        type: "text" | "select";
        options?: Option[];
    };
    operator: {
        name: string;
        type: "select";
        options: Option[];
    };
}

export interface Condition {
    logic?: string;
    conditions?: Condition[];
    lhs?: string;
    operator?: string;
    rhs?: string;
    type?: string;
}

export interface RulesProps {
    level?: number;
    logic?: string;
    conditions?: Condition[];
    onChange: (key: string, value: any) => void;
    ruleColumns?: Record<string, RuleColumn>;
    onLHSChange?: (value: string) => void;
    options?: Option[];
}
