import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg max-w-[40vw] w-fit max-h-[80vh] overflow-clip">
                {/* Header with fixed close button */}
                <div className="absolute top-0 right-0 p-6 z-10 rounded-tr-lg bg-transparent">
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center
                            text-red-600 hover:text-white
                            bg-gray-100 hover:bg-red-600
                            rounded-full focus:outline-none 
                            focus:ring-2 focus:ring-gray-300"
                    >
                        <IoCloseOutline className="w-6 h-6" />
                    </button>
                </div>

                {/* Scrollable content with padding */}
                <div className="overflow-y-auto max-h-[80vh] p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;