import AdminBusinesses from "./pages/AdminBusinesses";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

// ✅ ALL PAGES - Added missing BusinessSignIn import
import CartPage from "./pages/CartPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpBusiness from "./pages/SignUpBusiness";
import SignUpAdmin from "./pages/SignUpAdmin";
import SignInBusiness from "./pages/SignInBusiness";  // ✅ YOUR BUSINESS LOGIN
import Admin from "./pages/Admin";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import OrderNow from "./pages/OrderNow";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import AdminOrders from "./pages/AdminOrders";

const queryClient = new QueryClient();

const App = () => {
  return (
     <CartProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <ScrollToTop />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order" element={<OrderNow />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/business-signup" element={<SignUpBusiness />} />
              <Route path="/business-signin" element={<SignInBusiness />} /> {/* ✅ WORKS NOW */}
              <Route path="/signup-admin" element={<SignUpAdmin />} />
              <Route path="/admin/businesses" element={<AdminBusinesses />} />
              <Route path="/admin/orders" element={<AdminOrders />} />
              <Route path="/cart" element={<CartPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      </AuthProvider>
    </CartProvider> 
  );
};

export default App;
