import { MdClose } from "react-icons/md";

const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => (
    <button
        onClick={onDelete}
        className="p-1 text-red-500 hover:bg-red-50 rounded-lg"
    >
        <MdClose size={20} />
    </button>
);
export default DeleteButton