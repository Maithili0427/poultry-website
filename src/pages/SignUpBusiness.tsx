import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type RegistrationStatus = "yes" | "no" | "";

export default function SignUpBusiness() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [registrationStatus, setRegistrationStatus] =
    useState<RegistrationStatus>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const businessType =
      registrationStatus === "yes"
        ? "Registered Business"
        : "Unregistered Business";

    console.log("Business Type:", businessType);

    // mark user as logged in
    login();

    // redirect to home
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center dark:bg-slate-900 dark:text-white">
      <div className="bg-white w-[480px] p-10 rounded-xl shadow-xl dark:bg-slate-900 dark:text-white">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-2">
          Register Your Poultry Business
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign up to start selling poultry products
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-white">Business Name</label>
            <input
              type="text"
              required
              placeholder="ABC Poultry Farm"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-white">Owner Name</label>
            <input
              type="text"
              required
              placeholder="Owner full name"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-white">Email</label>
            <input
              type="email"
              required
              placeholder="owner@email.com"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700 dark:text-white">Phone</label>
            <input
              type="tel"
              required
              placeholder="Phone number"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-gray-700 dark:text-white">
              Is your business registered?
            </label>

            <div className="flex gap-6">
              <label>
                <input
                  type="radio"
                  name="registration"
                  value="yes"
                  onChange={(e) =>
                    setRegistrationStatus(e.target.value as RegistrationStatus)
                  }
                />{" "}
                Yes
              </label>

              <label>
                <input
                  type="radio"
                  name="registration"
                  value="no"
                  onChange={(e) =>
                    setRegistrationStatus(e.target.value as RegistrationStatus)
                  }
                />{" "}
                No
              </label>
            </div>
          </div>

          {registrationStatus === "yes" && (
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 dark:text-white">
                Business Registration Number
              </label>
              <input
                type="text"
                required
                placeholder="GST / FSSAI / License Number"
                className="w-full border rounded-lg p-2"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Password</label>
            <input
              type="password"
              required
              placeholder="********"
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg"
          >
            Register Business
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4 dark:text-white">
          Already have an account?{" "}
          <Link to="/signin" className="text-red-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}