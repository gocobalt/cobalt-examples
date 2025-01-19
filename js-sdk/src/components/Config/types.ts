import { MappingConfig, RuleColumn } from "../Field/types";

export interface Workflow {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    fields: DataSlot[];
}

export interface DataSlot {
    id: string;
    field_type: 'text' | 'textarea' | 'select' | 'map' | 'number' | 'email' | 'password';
    name: string;
    help_text?: string;
    required?: boolean;
    multiple?: boolean;
    placeholder?: string;
    options?: Array<{ name: string; value: string | number }>;
    labels?: Array<{ name: string; value: string; multiple?: boolean }>;
    value?: any;
    mapping?: MappingConfig;
    rule_columns?: Record<string, RuleColumn>;
}

export interface Config {
    fields?: DataSlot[];
    workflows?: Workflow[];
}
