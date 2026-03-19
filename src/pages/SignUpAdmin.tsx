import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Shield, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

export default function SignUpAdmin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const SECRET_CODE = "12345";

    if (adminCode !== SECRET_CODE) {
      setError("Invalid Admin Code!");
      setLoading(false);
      return;
    }

    // ✅ FIXED: Proper login data (no localStorage)
    login({
      email,
      role: 'admin',
      name: 'Farm Admin'
    });

    setTimeout(() => {
      navigate("/admin");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-red-50 dark:from-gray-900 dark:to-gray-800 px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/50 space-y-6">
        {/* Header - SAME as Regular */}
        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent mb-2">
            Admin Access
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Enter admin secret code to access farm management
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

        {/* Secret Code Hint */}
        <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border-2 border-green-200 text-center">
          <p className="text-green-800 font-mono text-sm font-semibold mb-1">🔑 Secret Code: 12345</p>
          <p className="text-xs text-green-700">Admin access code required</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-500" />
              Admin Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@royalroost.com"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-200 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-500" />
              Admin Secret Code *
            </label>
            <input
              type="text"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              placeholder="12345"
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100/50 bg-white/50 dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-all duration-200 font-mono tracking-wider text-center text-lg"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password || !adminCode}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5 disabled:scale-100"

          >
            {loading ? "Accessing Admin..." : "Grant Admin Access"}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center space-y-2 pt-6 border-t border-gray-200">
          <Link to="/signup" className="text-sm text-green-600 font-semibold hover:underline block">
            ← Regular Signup
          </Link>
          <Link to="/signup-business" className="text-sm text-red-600 font-semibold hover:underline block">
            Business Signup →
          </Link>
        </div>
      </div>
    </div>
  );
}
