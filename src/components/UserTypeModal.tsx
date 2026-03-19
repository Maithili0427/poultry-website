import React from "react";
import { useNavigate } from "react-router-dom";

const UserTypeModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // In UserTypeModal.tsx, UPDATE handleChoice function:
  const handleChoice = (type) => {
    onClose();

    if (type === "regular") {
      navigate("/signup");           // ✅ Matches App route
    }
    else if (type === "business") {
      navigate("/business-signup");  // ✅ FIXED: was /signup-business
    }
    else if (type === "admin") {
      navigate("/signup-admin");     // ✅ Good
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4">

        <h2 className="text-2xl font-bold mb-6 text-red-600 text-center">
          Choose your account type
        </h2>

        <div className="space-y-4">

          {/* Regular User */}
          <button
            onClick={() => handleChoice("regular")}
            className="w-full p-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Regular User
          </button>

          {/* Business Owner */}
          <button
            onClick={() => handleChoice("business")}
            className="w-full p-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Business Owner
          </button>

          {/* Admin */}
          <button
            onClick={() => handleChoice("admin")}
            className="w-full p-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Admin
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