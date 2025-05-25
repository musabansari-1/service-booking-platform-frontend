// components/Modal.tsx
import React, { ReactNode } from 'react';
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 text-gray-600 hover:text-gray-900"
        >
          <IoClose size={30} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
