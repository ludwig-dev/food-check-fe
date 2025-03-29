import React from "react";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        // Changed to align items at the top with extra padding
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-transparent pt-20">
            <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 max-h-screen overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
