import { MappingConfig } from "../Field/types";

export interface ConfigProps {
    slug: string;
    id: string;
    labels?: Record<string, string>;
    style?: React.CSSProperties;
    removeBranding?: boolean;
}

export interface Application {
    name: string;
    description?: string;
    icon: string;
    connected: boolean;
    reauth_required?: boolean;
    help?: string;
    auth_input_map?: AuthInputField[];
}

export interface AuthInputField {
    name: string;
    type: string;
    required: boolean;
    multiple?: boolean;
    label: string;
    help_text?: string;
    placeholder?: string;
    options?: Array<{ name: string; value: string | number }>;
}

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
}

export interface Config {
    fields?: DataSlot[];
    workflows?: Workflow[];
}
