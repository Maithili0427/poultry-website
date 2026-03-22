import { createContext, useContext, useReducer, useEffect } from "react";

type CartItem = {
  slug: string;
  title: string;
  quantity: number;
  price: number;
  img: string;
};

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { slug: string; quantity: number } }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(item => item.slug === action.payload.slug);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.slug === action.payload.slug
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.price
      };

    case "REMOVE_FROM_CART":
      const itemToRemove = state.items.find(item => item.slug === action.payload);
      return {
        ...state,
        items: state.items.filter(item => item.slug !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
      };

    case "UPDATE_QUANTITY":
      const updatedItems = state.items.map(item =>
        item.slug === action.payload.slug
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return {
        ...state,
        items: updatedItems,
        totalPrice: newTotalPrice,
        totalItems: updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      };

    case "CLEAR_CART":
      return { items: [], totalItems: 0, totalPrice: 0 };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalItems: 0, totalPrice: 0 });

  useEffect(() => {
    const saved = localStorage.getItem("farmCart");
    if (saved) {
      const parsed = JSON.parse(saved);
      dispatch({ type: "CLEAR_CART" });
      parsed.items.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          dispatch({ type: "ADD_TO_CART", payload: item });
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("farmCart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
