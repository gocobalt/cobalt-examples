import Select from "@/components/ui/Select";
import { DEFAULT_OPERATORS } from "./constants";
import { Condition, Option, RuleColumn } from "../types";
import RuleValueInput from "./RuleValueInput";
import DeleteButton from "./DeleteButton";

const RuleInputs: React.FC<{
    condition: Condition;
    ruleColumns: Record<string, RuleColumn>;
    options: Option[];
    onUpdate: (field: string, value: any, type?: string) => void;
    onLHSChange?: (value: string) => void;
    onDelete: () => void;
}> = ({ condition, ruleColumns, options, onUpdate, onLHSChange, onDelete }) => {
    const handleLHSChange = (value: string) => {
        onUpdate('lhs', value);
        onLHSChange?.(value);
    };

    const getOperatorOptions = () => {
        return condition.lhs &&
        ruleColumns?.[condition.lhs]?.operator?.options?.length && 
        ruleColumns?.[condition.lhs]?.operator?.options?.map(o => ({
            value: o.value,
            label: o.name,
        })) || DEFAULT_OPERATORS;
    };

    return (
        <div className="flex gap-2">
            <Select
                options={options.map(o => ({ value: o.value, label: o.name }))}
                value={condition.lhs}
                onChange={handleLHSChange}
                placeholder="Field"
                className="flex-[3]"
            />
            <Select
                options={getOperatorOptions()}
                value={condition.operator}
                onChange={(value) => onUpdate('operator', value)}
                placeholder="Operator"
                className="flex-[2]"
            />
            <RuleValueInput
                condition={condition}
                ruleColumns={ruleColumns}
                onUpdate={onUpdate}
            />
            <DeleteButton onDelete={onDelete} />
        </div>
    );
};

export default RuleInputs