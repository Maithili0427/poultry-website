import { useCart } from "../context/CartContext";
import { ShoppingCart, Badge } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartButton() {
  const { state } = useCart();

  return (
    <Link to="/cart" className="relative p-2 text-green-600 hover:text-green-700 transition-colors">
      <ShoppingCart className="w-7 h-7" />
      {state.totalItems > 0 && (
        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[20px] h-[20px] flex items-center justify-center">
          {state.totalItems}
        </Badge>
      )}
    </Link>
  );
}
