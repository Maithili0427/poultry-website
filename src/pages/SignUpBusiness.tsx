import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Building2, User, Mail, Phone, Lock, AlertCircle, CheckCircle } from "lucide-react";

type RegistrationStatus = "yes" | "no" | "";

export default function SignUpBusiness() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    registrationNumber: ""
  });
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          ownerName: form.ownerName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          registrationNumber: registrationStatus === "yes" ? form.registrationNumber : ""
        })
      });

      const data = await res.json();

      if (res.ok) {
        login({
          email: form.email,
          role: 'business',
          name: form.ownerName,
          businessApproved: false
        });

        setSuccess("Business registered! Waiting for admin approval ⏳");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Business signup error:", err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-red-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 space-y-6">
        {/* Header - SAME as Regular */}
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2">
            Business Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Register your poultry business for wholesale access
          </p>
        </div>

        {/* Success */}
        {success && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
            <p className="text-green-700 text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {success}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Business Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-green-500" />
              Business Name *
            </label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              placeholder="Royal Poultry Farms"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
              disabled={loading}
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
              <User className="w-5 h-5 text-green-500" />
              Owner Name *
            </label>
            <input
              type="text"
              value={form.ownerName}
              onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
              disabled={loading}
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-500" />
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="business@royalroost.com"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-500" />
                Phone *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Registration Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-200">
              Business Registration *
            </label>
            <div className="grid grid-cols-2 gap-3 p-3 bg-green-50/50 rounded-xl border border-green-200">
              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 hover:border-green-300 cursor-pointer transition-all">
                <input
                  type="radio"
                  name="registration"
                  value="yes"
                  checked={registrationStatus === "yes"}
                  onChange={(e) => setRegistrationStatus(e.target.value as RegistrationStatus)}
                  className="w-5 h-5 text-green-500 focus:ring-green-500"
                  disabled={loading}
                />
                <span className="font-medium text-gray-700">Registered</span>
              </label>
              <label className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 hover:border-green-300 cursor-pointer transition-all">
                <input
                  type="radio"
                  name="registration"
                  value="no"
                  checked={registrationStatus === "no"}
                  onChange={(e) => setRegistrationStatus(e.target.value as RegistrationStatus)}
                  className="w-5 h-5 text-green-500 focus:ring-green-500"
                  disabled={loading}
                />
                <span className="font-medium text-gray-700">Not Registered</span>
              </label>
            </div>
          </div>

          {/* Registration Number */}
          {registrationStatus === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-green-500" />
                Registration Number *
              </label>
              <input
                type="text"
                value={form.registrationNumber}
                onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
                placeholder="GSTIN/FSSAI/License Number"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
                required={registrationStatus === "yes"}
                disabled={loading}
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-500" />
              Password *
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !form.businessName || !form.ownerName || !form.email || !form.phone || !form.password || (registrationStatus === "yes" && !form.registrationNumber)}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 disabled:scale-100"
          >
            {loading ? "Creating Business..." : "Register Business"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have a business account?{" "}
          <Link to="/business-signin" className="text-red-600 font-semibold hover:text-red-700 font-bold hover:underline transition-colors">
            Sign in as Business
          </Link>
        </p>
      </div>
    </div>
  );
}
