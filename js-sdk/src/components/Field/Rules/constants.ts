export const LOGIC_OPTIONS = ['AND', 'OR'] as const;

export const DEFAULT_OPERATORS = [
    { value: 'eq', label: 'Equals To' },
    { value: 'neq', label: 'Not Equals To' },
    { value: 'start_with', label: 'Start With' },
    { value: 'end_with', label: 'End With' },
    { value: 'greater_or_equal', label: 'Greater or Equal' },
    { value: 'less_or_equal', label: 'Less or Equal' },
];