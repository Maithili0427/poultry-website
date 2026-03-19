import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function SignUp() {
  const { login } = useAuth();  // ✅ Already correct
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  // ✅ Added name field
  const [loading, setLoading] = useState(false);  // ✅ Added loading state
  const [error, setError] = useState("");  // ✅ Added error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          name,  // ✅ Send name to backend
          role: "regular"  // ✅ Fixed role name
        })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ FIXED: Single login call, matches AuthContext
        login({
          email,
          role: 'regular',
          name
        });

        // ✅ Remove localStorage (AuthContext handles it)
        navigate("/");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-red-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Sign up to place your poultry orders quickly
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@royalroost.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
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
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-red-600 font-semibold hover:text-red-700 font-bold hover:underline transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
