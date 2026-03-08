import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChoice = (type) => {
    onClose();
    if (type === 'regular') {
      navigate('/signup');
    } else {
      navigate('/business-signup');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-600 text-center">
          Choose your account type 
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => handleChoice('regular')}
            className="w-full p-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Regular User
          </button>
          <button
            onClick={() => handleChoice('business')}
            className="w-full p-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Business Owner
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-6 text-sm text-gray-500 hover:text-gray-700 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserTypeModal;
