import { LOGIC_OPTIONS } from "./constants";

const LogicButtons: React.FC<{
    selectedLogic?: string;
    onChange: (logic: string | undefined) => void;
}> = ({ selectedLogic, onChange }) => (
    <div className="flex rounded-lg border border-gray-200">
        {LOGIC_OPTIONS.map((logic) => (
            <button
                key={logic}
                onClick={() => onChange(logic === selectedLogic ? undefined : logic)}
                className={`px-3 py-1 text-sm ${logic === selectedLogic
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    } first:rounded-l-lg last:rounded-r-lg`}
            >
                {logic}
            </button>
        ))}
    </div>
);
export default LogicButtons