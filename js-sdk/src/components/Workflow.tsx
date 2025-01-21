import React from "react";

interface WorkflowProps {
    title: string;
    description?: string;
    enabled: boolean;
    onEnabledChange: () => void;
    children?: React.ReactNode;
    className?: string;
}

const Workflow: React.FC<WorkflowProps> = ({
    title,
    description,
    enabled,
    onEnabledChange,
    children,
    className = "",
}) => (
    <div className={`flex flex-col border border-gray-200 rounded ${className}`}>
        <div className={`
            flex flex-row items-center justify-between gap-2 p-3
            ${enabled ? 'border-b border-gray-200 bg-gray-50' : ''}
            rounded-t
        `}>
            <div className="flex-1">
                <div className="text-base font-medium text-gray-900">
                    {title}
                </div>
                {description && (
                    <div className="mt-1 text-sm text-gray-500 leading-none">
                        {description}
                    </div>
                )}
            </div>
            <label className="inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={onEnabledChange}
                    className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div>
        {enabled && (
            <div className="flex flex-col gap-4 p-3">
                {children}
            </div>
        )}
    </div>
);

export default Workflow;