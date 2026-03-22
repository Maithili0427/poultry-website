import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Building2, Mail, Lock, AlertCircle } from "lucide-react";

export default function SignInBusiness() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // 🔥 MISSING STATE HOOKS - ADD THESE
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 FIXED handleSubmit - INSIDE COMPONENT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🔥 BUSINESS LOGIN - FAKE SUCCESS!");
    setLoading(true);
    setError("");

    // FAKE LOGIN (1.5s delay)
    setTimeout(() => {
      login({
        email: form.email,
        role: "business",
        name: "Test Business", 
        businessApproved: false
      });
      navigate("/");  // Homepage!
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-red-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-green-600 p-3 rounded-xl mx-auto mb-4 w-fit">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2">
            Business Login
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Sign in to your registered business account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-500" />
              Business Email *
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

          <button
            type="submit"
            disabled={loading || !form.email || !form.password}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 disabled:scale-100"
          >
            {loading ? "Signing In..." : "Business Login"}
          </button>
        </form>

        {/* Footer Links */}
        <div className="text-center space-y-3 pt-6 border-t border-gray-200">
          <Link 
            to="/signupbusiness" 
            className="block text-sm text-green-600 font-semibold hover:underline transition-colors"
          >
            Don't have a business account? Register here
          </Link>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/signup" className="text-sm text-red-600 font-semibold hover:underline">
              Individual Signup
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/signin" className="text-sm text-gray-600 font-semibold hover:underline">
              Regular Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
