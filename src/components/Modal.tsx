// // components/Modal.tsx
// import React, { ReactNode } from 'react';
// import { IoClose } from "react-icons/io5";

// interface ModalProps {
//   isVisible: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
//   if (!isVisible) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//       {/* <div className="bg-white p-6 rounded-lg shadow-lg relative"> */}
//         <button 
//           onClick={onClose} 
//           className="absolute top-8 right-8 text-gray-600 hover:text-gray-900"
//         >
//           <IoClose size={30} />
//         </button>
//         {children}
//       {/* </div> */}
//     </div>
//   );
// };

// export default Modal;


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
    <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex justify-center items-center z-50">
      {/* <div className="relative bg-white max-w-3xl w-full mx-4 p-6 rounded-xl shadow-lg"> */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <IoClose size={30} color='white' />
        </button>
        {children}
      {/* </div> */}
    </div>
  );
};

export default Modal;

