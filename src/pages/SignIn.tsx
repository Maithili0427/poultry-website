import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ FIXED: Proper login() call with user data
    try {
      // Admin demo login
      if (email === "admin@farm.com" && password === "admin123") {
        login({
          email: "admin@farm.com",
          role: "admin",
          name: "Farm Admin"
        });
        navigate("/admin");
        return;
      }

      // Regular user login (demo - replace with API later)
      if (email && password) {
        login({
          email,
          role: "regular",
          name: email.split('@')[0]  // Use email prefix as name
        });
        navigate("/order");
        return;
      }

      setError("Invalid email or password");
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-red-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Sign in to access your poultry orders
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@farm.com or you@royalroost.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 disabled:scale-100" required
              disabled={loading}
              minLength={6}
            />
          </div>

          {/* ✅ Demo credentials hint */}
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            👑 Demo: admin@farm.com / admin123
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 disabled:scale-100"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 font-semibold hover:text-red-700 font-bold hover:underline transition-colors"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
