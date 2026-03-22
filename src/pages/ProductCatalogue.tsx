import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Search, Plus, Edit3, Trash2, Eye, Filter, Building2 } from "lucide-react";

export default function ProductCatalogue() {
  const { user } = useAuth();
  
  // Sample poultry products (your real data will come from backend)
  const [products, setProducts] = useState([
    { id: 1, name: "Broiler Chicks (Day Old)", category: "Chicks", price: 45, wholesale: 40, stock: 1250, image: "broiler.jpg" },
    { id: 2, name: "Layer Chicks (BV-380)", category: "Chicks", price: 55, wholesale: 48, stock: 890, image: "layer.jpg" },
    { id: 3, name: "Broiler Feed (Starter)", category: "Feed", price: 850, wholesale: 720, stock: 45, image: "feed.jpg" },
    { id: 4, name: "Vaccines (Newcastle)", category: "Health", price: 120, wholesale: 105, stock: 320, image: "vaccine.jpg" },
    { id: 5, name: "Layer Feed (Grower)", category: "Feed", price: 780, wholesale: 660, stock: 67, image: "feed.jpg" },
  ]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter products
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (!categoryFilter || product.category === categoryFilter)
  );

  // Admin check
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-green-50 flex items-center justify-center">
        <div className="text-center p-12">
          <Building2 className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Access Required</h1>
          <p className="text-xl text-gray-600">Only administrators can view product catalogue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Product Catalogue
            </h1>
            <p className="text-gray-600 mt-2">Manage all poultry products, pricing & stock</p>
          </div>
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
            <Plus size={20} />
            Add New Product
          </button>
        </div>

        {/* Search & Filter */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100/50 transition-all"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100/50"
            >
              <option value="">All Categories</option>
              <option value="Chicks">Chicks</option>
              <option value="Feed">Feed</option>
              <option value="Health">Health</option>
              <option value="Equipment">Equipment</option>
            </select>
            <div className="flex gap-2">
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all flex items-center gap-2">
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                <tr>
                  <th className="p-6 text-left font-semibold">Product</th>
                  <th className="p-6 text-left font-semibold">Category</th>
                  <th className="p-6 text-right font-semibold">Retail Price</th>
                  <th className="p-6 text-right font-semibold">Wholesale</th>
                  <th className="p-6 text-right font-semibold">Stock</th>
                  <th className="p-6 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-green-50 transition-colors">
                    <td className="p-6 font-medium text-gray-900">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">P</span>
                        </div>
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-gray-500">ID: #{product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="text-2xl font-bold text-green-600">₹{product.price}</div>
                      <div className="text-sm text-gray-500 line-through">₹{product.price + 50}</div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="text-xl font-bold text-emerald-600">₹{product.wholesale}</div>
                    </td>
                    <td className="p-6 text-right">
                      <div className={`text-xl font-bold ${
                        product.stock > 50 ? 'text-green-600' : 
                        product.stock > 10 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {product.stock}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                          <Edit3 size={18} />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Building2 className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
                Add First Product
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold text-green-600">{products.length}</div>
            <div className="text-gray-600 mt-2">Total Products</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold text-emerald-600">₹2.45L</div>
            <div className="text-gray-600 mt-2">Total Revenue</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold text-blue-600">89%</div>
            <div className="text-gray-600 mt-2">In Stock</div>
          </div>
          <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl text-center">
            <div className="text-3xl font-bold text-orange-600">12</div>
            <div className="text-gray-600 mt-2">Low Stock</div>
          </div>
        </div>
      </div>
    </div>
  );
}
