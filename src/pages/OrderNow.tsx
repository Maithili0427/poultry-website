import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";
import eggsBasket from "@/assets/eggs-basket.jpg";
import chickensFeed from "@/assets/chickens-feeding.jpg";
import poultryFeed from "@/assets/poultry-feed.jpg";
import rooster from "@/assets/rooster-portrait.jpg";

const products = [
  { id: "eggs", img: eggsBasket, title: "Fresh Organic Eggs", price: "$4.99/dozen" },
  { id: "chicks", img: chickensFeed, title: "Day-Old Chicks", price: "$1.50/chick" },
  { id: "feed", img: poultryFeed, title: "Premium Poultry Feed", price: "$25/bag" },
  { id: "breeding", img: rooster, title: "Breeding Stock", price: "$15/bird" },
];

const OrderNow = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", product: "", quantity: "1", notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Order Submitted! ✅", description: "We'll contact you within 24 hours to confirm your order." });
    setForm({ name: "", email: "", phone: "", product: "", quantity: "1", notes: "" });
  };

  return (
    <Layout>
      <section className="bg-primary section-padding text-center">
        <div className="container-max">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">Order Now</h1>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Fill out the form below and we'll process your order quickly. Wholesale pricing available.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Selection Preview */}
            <AnimatedSection>
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Our Products</h2>
              <div className="grid grid-cols-2 gap-4">
                {products.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setForm({ ...form, product: p.title })}
                    className={`rounded-lg border-2 overflow-hidden text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      form.product === p.title
                        ? "border-primary shadow-lg"
                        : "border-border"
                    }`}
                  >
                    <div className="h-28 overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-semibold text-foreground">{p.title}</div>
                      <div className="text-xs text-primary font-medium">{p.price}</div>
                    </div>
                  </button>
                ))}
              </div>
            </AnimatedSection>

            {/* Order Form */}
            <AnimatedSection delay={0.15}>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Order Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Quantity</label>
                    <input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Selected Product</label>
                  <input type="text" readOnly value={form.product}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-muted text-foreground text-sm" placeholder="Click a product on the left" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Additional Notes</label>
                  <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Special requests, delivery preferences..." />
                </div>

                <button type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
                  Submit Order
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
