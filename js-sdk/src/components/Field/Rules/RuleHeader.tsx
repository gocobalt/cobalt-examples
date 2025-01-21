import { Condition } from "../types";
import { LOGIC_OPTIONS } from "./constants";
import DeleteButton from "./DeleteButton";
import LogicButtons from "./LogicButtons";

const RuleHeader: React.FC<{
    index: number;
    condition: Condition;
    onLogicChange: (logic: string | undefined) => void;
    onDelete: () => void;
    onAddConditions: (logic: string) => void;
}> = ({ index, condition, onLogicChange, onDelete, onAddConditions }) => (
    <div className="flex items-center justify-between mb-4">
        <div className="font-bold">Rule {index + 1}</div>
        <div className="flex gap-2">
            {condition.conditions?.length ? (
                <LogicButtons
                    selectedLogic={condition.logic}
                    onChange={onLogicChange}
                />
            ) : (
                LOGIC_OPTIONS.map((logic) => (
                    <button
                        key={logic}
                        onClick={() => onAddConditions(logic)}
                        className="px-3 py-1 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg"
                    >
                        + {logic}
                    </button>
                ))
            )}
            <DeleteButton onDelete={onDelete} />
        </div>
    </div>
);
export default RuleHeader