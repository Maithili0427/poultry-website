"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";  // ✅ Added
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

import eggsBasket from "@/assets/eggs-basket.jpg";
import chicks from "@/assets/Day-Old Chicks.jpg";
import poultryFeed from "@/assets/poultry-feed.jpg";
import rooster from "@/assets/rooster-portrait.jpg";
import chickensFeed from "@/assets/chickens-feeding.jpg";
import broilerChicken from "@/assets/broiler-chicken.jpg";

emailjs.init("M0YnjTHPFmVoE9_Dv");

const products = [
  { id: "eggs", img: eggsBasket, title: "Fresh Organic Eggs", price: "₹180/dozen", wholesalePrice: "₹150/dozen (MOQ: 10)" },
  { id: "chicks", img: chicks, title: "Day-Old Chicks", price: "₹40/chick", wholesalePrice: "₹32/chick (MOQ: 100)" },
  { id: "feed", img: poultryFeed, title: "Premium Poultry Feed", price: "₹2,000/bag", wholesalePrice: "₹1,700/bag (MOQ: 10)" },
  { id: "breeding", img: rooster, title: "Breeding Stock", price: "₹800/bird", wholesalePrice: "₹680/bird (MOQ: 20)" },
  { id: "layers", img: chickensFeed, title: "Layer Chickens", price: "₹500/bird", wholesalePrice: "₹450/bird (MOQ: 50)" },
  { id: "broilers", img: broilerChicken, title: "Broiler Chickens", price: "₹350/bird", wholesalePrice: "₹300/bird (MOQ: 100)" },
];

const SERVICE_ID = "service_2qx29yp";
const TEMPLATE_ID = "template_6qz7a7m";

const OrderNow = () => {
  const { user } = useAuth();  // ✅ AuthContext
  const { toast } = useToast();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const selectedProduct = params.get("product");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: selectedProduct || "",
    quantity: "1",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [canOrder, setCanOrder] = useState(true);

  // ✅ Role-based ordering logic
  useEffect(() => {
    if (user?.role === 'business' && !user.businessApproved) {
      setCanOrder(false);
      toast({
        title: "⏳ Approval Pending",
        description: "Your business account needs admin approval for wholesale ordering."
      });
    } else {
      setCanOrder(true);
    }
  }, [user, toast]);

  // ✅ Updated getPrice function
  const getPrice = (product, userRole) => {
    if (userRole === 'business' && user?.businessApproved) {
      return (
        <div className="space-y-1">
          <span className="text-lg font-bold text-green-600 line-through">{product.price}</span>
          <span className="text-xl font-bold text-blue-600">{product.wholesalePrice}</span>
        </div>
      );
    }
    return <span className="text-xl font-bold text-green-600">{product.price}</span>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ BLOCK 2: Business approval check
    if (user?.role === 'business' && !user.businessApproved) {
      toast({
        title: "❌ Access Denied",
        description: "Business pending admin approval. Contact support."
      });
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.product) {
      toast({
        title: "Error ❌",
        description: "Please fill all required fields."
      });
      return;
    }

    setLoading(true);

    const templateParams = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      product: form.product,
      quantity: form.quantity,
      userType: user?.role || 'guest',
      orderStatus: user?.role === 'business' ? 'Pending Admin Approval' : 'Auto-Approved',
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, "M0YnjTHPFmVoE9_Dv");
      
      toast({
        title: "Order Submitted! ✅",
        description: user?.role === 'business' 
          ? "Order sent for admin approval." 
          : "Order auto-approved & processing!"
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        product: "",
        quantity: "1",
        notes: "",
      });

    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Failed to send order. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
        <motion.img
          src={eggsBasket}
          alt="Order poultry products"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3 }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center w-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Order Now
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Fill the form below to order our fresh poultry products.
          </p>
          {/* ✅ User status indicator */}
          {user && (
            <div className="mt-4 p-3 bg-white/20 backdrop-blur-sm rounded-xl max-w-md mx-auto">
              <span className="font-semibold text-white">
                {user.role === 'admin' && '👑 Admin'}
                {user.role === 'business' && user.businessApproved && '🏢 Business Verified'}
                {user.role === 'business' && !user.businessApproved && '⏳ Business (Pending)'}
                {user.role === 'regular' && '👤 Regular Customer'}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Products Grid */}
            <AnimatedSection>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Our Products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setForm({ ...form, product: p.title })}
                    disabled={!canOrder}
                    className={`rounded-xl border-2 overflow-hidden text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed ${
                      form.product === p.title
                        ? "border-primary shadow-lg ring-2 ring-primary/50"
                        : "border-border hover:border-primary"
                    }`}
                  >
                    <div className="h-28 md:h-32 overflow-hidden">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-semibold text-foreground line-clamp-2">
                        {p.title}
                      </div>
                      <div className="text-xs text-muted-foreground mb-1">
                        {user?.role === 'business' && user.businessApproved ? 'Wholesale' : 'Retail'}
                      </div>
                      {getPrice(p, user?.role)}
                    </div>
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Order Form */}
            <AnimatedSection delay={0.15}>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl shadow-md p-6 md:p-8 space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Order Details</h2>
                
                {/* ✅ Business approval warning */}
                {user?.role === 'business' && !user.businessApproved && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                    <p className="text-yellow-800 font-medium mb-2">⚠️ Business Verification Pending</p>
                    <p className="text-sm text-yellow-700">Your order will be reviewed by admin before approval.</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />
                </div>

                <input
                  type="text"
                  readOnly
                  value={form.product}
                  placeholder="Select product"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-muted"
                />

                <textarea
                  rows={3}
                  placeholder="Additional Notes (delivery instructions, etc.)"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background resize-none focus:ring-2 focus:ring-primary"
                />

                <button
                  type="submit"
                  disabled={loading || !canOrder}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] hover:shadow-lg transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading 
                    ? "Submitting..." 
                    : !canOrder 
                      ? "Pending Approval" 
                      : "Submit Order"
                  }
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrderNow;
