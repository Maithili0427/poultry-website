import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";  // ✅ New import

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuth();  // ✅ Use new AuthContext

  useEffect(() => {
    // ✅ Updated to use AuthContext instead of localStorage
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return null;  // Prevent flash while redirecting
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black">
      {/* Your Existing Navbar */}
      <Navbar />

      <div className="p-10">
        <h1 className="text-3xl font-bold text-red-700 mb-8 flex items-center gap-3">
          Admin Dashboard
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Welcome, {user.name || user.email}
          </span>
        </h1>

        {/* ✅ Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border">
          <Link 
            to="/admin" 
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:scale-105 transition-all shadow-lg"
          >
            Dashboard
          </Link>
          <Link 
            to="/admin/orders" 
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:scale-105 transition-all shadow-md"
          >
            Orders
          </Link>
          <Link 
            to="/admin/businesses" 
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:scale-105 transition-all shadow-md"
          >
            Businesses
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Business Approvals */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-l-4 border-yellow-400">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Business Registrations
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Review & approve new business accounts
                </p>
              </div>
            </div>
            <Link
              to="/admin/businesses"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              Manage Businesses →
            </Link>
          </div>

          {/* Order Management */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-l-4 border-green-400">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <span className="text-2xl">📦</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Wholesale Orders
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Approve business orders & set delivery dates
                </p>
              </div>
            </div>
            <Link
              to="/admin/orders"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              View Orders →
            </Link>
          </div>

          {/* Product Management */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-l-4 border-blue-400">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <span className="text-2xl">🐔</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  Product Catalog
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Manage poultry products & pricing
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 w-full">
              Manage Products →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
