import { IoClose } from "react-icons/io5"

const Error = ({
    message,
    onClose
}: {
    message: string,
    onClose: () => void
}) => {
    return <div className="flex items-center z-10 justify-between absolute top-0 left-0 bg-red-200 text-red-600 font-bold p-2 w-full">
        {message}
        <button onClick={onClose}><IoClose size={20} /></button>
    </div>
}
export default Error