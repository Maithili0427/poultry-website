"use client";

import { useState } from "react";
import { useLocation } from "react-router-dom";
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
  { id: "eggs", img: eggsBasket, title: "Fresh Organic Eggs", price: "₹180/dozen" },
  { id: "chicks", img: chicks, title: "Day-Old Chicks", price: "₹40/chick" },
  { id: "feed", img: poultryFeed, title: "Premium Poultry Feed", price: "₹2,000/bag" },
  { id: "breeding", img: rooster, title: "Breeding Stock", price: "₹800/bird" },
  { id: "layers", img: chickensFeed, title: "Layer Chickens", price: "₹500/bird" },
  { id: "broilers", img: broilerChicken, title: "Broiler Chickens", price: "₹350/bird" },
];

const SERVICE_ID = "service_2qx29yp";
const TEMPLATE_ID = "template_6qz7a7m";

const OrderNow = () => {

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

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!form.name || !form.email || !form.phone) {
      toast({
        title: "Error ❌",
        description: "Name, Email & Phone are required."
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
      notes: form.notes,
    };

    try {

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        "M0YnjTHPFmVoE9_Dv"
      );

      toast({
        title: "Order Submitted! ✅",
        description: "Order sent successfully!"
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
        description: "Failed to send order."
      });

    } finally {

      setLoading(false);

    }
  };

  return (

    <Layout>

      {/* Hero Section */}

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

        </div>

      </section>


      {/* Products + Form */}

      <section className="section-padding">

        <div className="container-max">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Products */}

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
                    className={`rounded-xl border-2 overflow-hidden text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      form.product === p.title
                        ? "border-primary shadow-lg"
                        : "border-border"
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

                      <div className="text-sm font-semibold text-foreground">
                        {p.title}
                      </div>

                      <div className="text-xs text-primary font-medium">
                        {p.price}
                      </div>

                    </div>

                  </button>

                ))}

              </div>

            </AnimatedSection>


            {/* Order Form */}

            <AnimatedSection delay={0.15}>

              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-2xl shadow-md p-6 md:p-8 space-y-6"
              >

                <h2 className="text-2xl font-bold text-foreground">
                  Order Details
                </h2>


                {/* Name Email */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />

                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />

                </div>


                {/* Phone Quantity */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />

                  <input
                    type="number"
                    min="1"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary"
                  />

                </div>


                {/* Product */}

                <input
                  type="text"
                  readOnly
                  value={form.product}
                  placeholder="Select product"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-muted"
                />


                {/* Notes */}

                <textarea
                  rows={3}
                  placeholder="Additional Notes"
                  value={form.notes}
                  onChange={(e) =>
                    setForm({ ...form, notes: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background resize-none focus:ring-2 focus:ring-primary"
                />


                {/* Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:scale-[1.02] hover:shadow-lg transition-all"
                >
                  {loading ? "Submitting..." : "Submit Order"}
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