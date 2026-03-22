import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; 
export default function CartPage() {
  const { state, dispatch } = useCart();
  const [isOpen, setIsOpen] = useState(true);

  const updateQuantity = (slug, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: "REMOVE_FROM_CART", payload: slug });
    } else {
      dispatch({ 
        type: "UPDATE_QUANTITY", 
        payload: { slug, quantity } 
      });
    }
  };

  const clearCart = () => {
    if (window.confirm("Clear all items?")) {
      dispatch({ type: "CLEAR_CART" });
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <Link 
            to="/products" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-xl hover:shadow-2xl"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-green-50 to-red-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <div key={item.slug} className="flex gap-6 p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50">
                <img 
                  src={`http://localhost:5000${item.img}`} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center transition-all"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold text-lg min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="w-10 h-10 rounded-lg bg-white hover:bg-gray-200 flex items-center justify-center transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.slug, 0)}
                      className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 px-4 py-2 rounded-xl hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:sticky lg:top-20 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/50">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-lg">
                  <span>Items: {state.totalItems}</span>
                  <span>{state.totalItems} pcs</span>
                </div>
                <div className="flex justify-between text-2xl font-bold text-green-600">
                  <span>Total:</span>
                  <span>₹{state.totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <Link
                to="/checkout"
                className="w-full block py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-xl rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:-translate-y-1 text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
