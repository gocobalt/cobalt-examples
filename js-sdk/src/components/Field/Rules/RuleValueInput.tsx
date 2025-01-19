import Select from "@/components/ui/Select";
import { Condition, RuleColumn } from "../types";

const RuleValueInput: React.FC<{
    condition: Condition;
    ruleColumns: Record<string, RuleColumn>;
    onUpdate: (field: string, value: any, type?: string) => void;
}> = ({ condition, ruleColumns, onUpdate }) => {
    const inputType = condition.lhs && (ruleColumns?.[condition.lhs]?.rhs?.type || condition.type);

    if (inputType === "select") {
        return (
            <Select
                options={condition.lhs && ruleColumns?.[condition.lhs]?.rhs?.options?.map(o => ({
                    value: o.value,
                    label: o.name,
                })) || []}
                value={condition.rhs}
                onChange={(value) => onUpdate('rhs', value, inputType)}
                placeholder="Value"
                className="flex-[3]"
            />
        );
    }

    return (
        <input
            type={inputType || "text"}
            placeholder="Value"
            value={condition.rhs || ''}
            onChange={(e) => onUpdate('rhs', e.target.value, inputType)}
            className="flex-[3] rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
    );
};

export default RuleValueInput