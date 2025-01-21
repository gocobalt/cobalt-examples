import { MdAdd } from "react-icons/md";
import RuleInputs from "./RuleInputs";
import LogicButtons from "./LogicButtons";
import RuleHeader from "./RuleHeader";
import { RulesProps } from "../types";

const Rules: React.FC<RulesProps> = ({
    level = 0,
    logic,
    conditions = [],
    onChange,
    ruleColumns,
    onLHSChange,
    options = [],
}) => {
    const handleAddCondition = () => {
        onChange("conditions", [...conditions, {}]);
    };

    const handleAddConditions = (index: number, newLogic: string) => {
        const newConditions = [...conditions];
        newConditions[index] = {
            logic: newLogic,
            conditions: [newConditions[index], {}],
        };
        onChange("conditions", newConditions);
    };

    const handleDeleteCondition = (index: number) => {
        const newConditions = [...conditions];
        newConditions.splice(index, 1);
        onChange("conditions", newConditions);
    };

    const handleUpdateCondition = (index: number, field: string, value: any, type?: string) => {
        const newConditions = [...conditions];
        newConditions[index] = {
            ...newConditions[index],
            [field]: value,
            ...(type && { type })
        };
        onChange("conditions", newConditions);
    };

    return (
        <div className="flex flex-col gap-4">
            {level === 0 && conditions.length > 0 && (
                <div className="flex gap-2">
                    <LogicButtons
                        selectedLogic={logic}
                        onChange={(newLogic) => onChange("logic", newLogic)}
                    />
                </div>
            )}

            {conditions.map((condition, index) => (
                <div key={index} className="flex flex-col gap-4">
                    {index > 0 && (
                        <div className="text-gray-500 font-medium">{logic}</div>
                    )}

                    <div className={`${level === 0 ? 'border rounded-lg p-4' : ''}`}>
                        {level === 0 && (
                            <RuleHeader
                                index={index}
                                condition={condition}
                                onLogicChange={(newLogic) =>
                                    handleUpdateCondition(index, "logic", newLogic === condition.logic ? undefined : newLogic)
                                }
                                onDelete={() => handleDeleteCondition(index)}
                                onAddConditions={(newLogic) => handleAddConditions(index, newLogic)}
                            />
                        )}

                        {condition.logic ? (
                            <Rules
                                level={level + 1}
                                logic={condition.logic}
                                conditions={condition.conditions}
                                onChange={(key, value) =>
                                    handleUpdateCondition(index, key, value)
                                }
                                ruleColumns={ruleColumns}
                                onLHSChange={onLHSChange}
                                options={options}
                            />
                        ) : (
                            <RuleInputs
                                condition={condition}
                                ruleColumns={ruleColumns ?? {}}
                                options={options}
                                onUpdate={(field, value, type) =>
                                    handleUpdateCondition(index, field, value, type)
                                }
                                onLHSChange={onLHSChange}
                                onDelete={() => handleDeleteCondition(index)}
                            />
                        )}
                    </div>
                </div>
            ))}

            <div>
                <button
                    onClick={handleAddCondition}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                    <MdAdd /> Add Rule
                </button>
            </div>
        </div>
    );
};

export default Rules;