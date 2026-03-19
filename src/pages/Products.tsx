import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";  // ✅ Added
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import eggsBasket from "@/assets/eggs-basket.jpg";
import chickensFeed from "@/assets/chickens-feeding.jpg";
import poultryFeed from "@/assets/poultry-feed.jpg";
import rooster from "@/assets/rooster-portrait.jpg";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Plus } from "lucide-react";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="product-card">
      <img src={`http://localhost:5000${product.img}`} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">
        ₹{product.price.toLocaleString()} / {product.unit}
      </p>
      
      {/* ✅ ADD TO CART BUTTON */}
      <button
        onClick={addToCart}
        className="w-full mt-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
      >
        <Plus className="w-5 h-5 inline mr-2" />
        Add to Cart
      </button>
    </div>
  );
};

const products = [
  {
    id: "eggs",
    img: eggsBasket,
    title: "Fresh Organic Eggs",
    desc: "Our free-range hens produce nutrient-rich eggs daily. Available in various sizes and packaging options for retail and wholesale.",
    retailPrice: "₹180/dozen",
    wholesalePrice: "₹150/dozen (MOQ: 10)",
  },
  {
    id: "chicks",
    img: chickensFeed,
    title: "Day-Old Chicks",
    desc: "Vaccinated, healthy day-old chicks bred for both broiler and layer production. Available in bulk for commercial farmers.",
    retailPrice: "₹100/chick",
    wholesalePrice: "₹80/chick (MOQ: 100)",
  },
  {
    img: poultryFeed,
    id: "feed",
    title: "Premium Poultry Feed",
    desc: "Scientifically formulated feed blends for starter, grower, and layer phases. Enriched with essential vitamins and minerals.",
    retailPrice: "₹2,000/bag",
    wholesalePrice: "₹1,700/bag (MOQ: 10)",
  },
  {
    id: "breeding",
    img: rooster,
    title: "Breeding Stock",
    desc: "Premium breeding roosters and hens for improving flock genetics. Health-certified and from top bloodlines.",
    retailPrice: "₹800/bird",
    wholesalePrice: "₹680/bird (MOQ: 20)",
  },
];

const services = [
  { title: "Farm Consultation", desc: "Expert advice on setting up and managing your poultry farm for maximum productivity." },
  { title: "Veterinary Services", desc: "Regular health checks, vaccination programs, and disease management solutions." },
  { title: "Training Programs", desc: "Hands-on workshops for both beginner and experienced poultry farmers." },
  { title: "Supply Chain Solutions", desc: "End-to-end logistics support for getting your products to market efficiently." },
];

const Products = () => {
  const { user } = useAuth();  // ✅ AuthContext integration

  // ✅ Role-based price display (BLOCK 3)
  const getPriceDisplay = (product) => {
    if (user?.role === 'regular') {
      return (
        <span className="text-xl font-bold text-green-600">
          {product.retailPrice}
        </span>
      );
    }
    
    if (user?.role === 'business' && user.businessApproved) {
      return (
        <div className="space-y-1">
          <span className="text-lg font-bold text-green-600 line-through">
            {product.retailPrice}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-600">
              {product.wholesalePrice}
            </span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
              Wholesale
            </span>
          </div>
        </div>
      );
    }
    
    if (user?.role === 'business' && !user.businessApproved) {
      return (
        <div className="flex items-center gap-2 text-yellow-600 bg-yellow-50 p-2 rounded-lg">
          <span className="text-sm font-medium">⏳</span>
          <span className="text-sm">Pending approval for wholesale pricing</span>
        </div>
      );
    }
    
    // Guest users see retail price
    return (
      <span className="text-xl font-bold text-green-600">
        {product.retailPrice}
      </span>
    );
  };

  return (
    <Layout>
      {/* ================= HERO ================= */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1600&q=80"
            alt="Premium poultry products and services"
            className="w-full h-full object-cover"
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
        </div>

        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Products & Services
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Premium poultry products and professional farming solutions designed 
              to support quality and sustainable growth.
            </p>
            {/* ✅ User status indicator */}
            {user && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl"
              >
                <span className="text-white font-semibold">
                  {user.role === 'admin' && '👑 Admin View'}
                  {user.role === 'business' && user.businessApproved && '🏢 Business Verified'}
                  {user.role === 'business' && !user.businessApproved && '⏳ Business (Pending)'}
                  {user.role === 'regular' && '👤 Regular Customer'}
                </span>
              </motion.div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Our Products
            </h2>
            {user?.role === 'business' && !user.businessApproved && (
              <p className="text-yellow-600 max-w-2xl mx-auto text-center">
                Your wholesale prices will be visible once admin approves your business account.
              </p>
            )}
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 0.1}>
                <div className="group rounded-lg overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  
                  <div className="overflow-hidden h-60 relative">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* ✅ Wholesale badge for approved business */}
                    {user?.role === 'business' && user.businessApproved && (
                      <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        WHOLESALE
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-heading font-bold text-foreground text-lg leading-tight">
                        {product.title}
                      </h3>
                      <div className="flex flex-col items-end">
                        {getPriceDisplay(product)}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      {product.desc}
                    </p>

                    <Link
                      to={`/order?product=${encodeURIComponent(product.title)}`}
                      className="inline-flex items-center justify-center w-full px-5 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group-hover:bg-primary/90"
                    >
                      Order Now →
                      <motion.span 
                        className="ml-2"
                        initial={{ x: 0 }}
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Our Services
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="section-padding bg-background text-foreground">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Why Choose Our Poultry Farm?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards in hygiene, nutrition, and sustainability 
              to deliver fresh and healthy poultry products you can trust.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection>
              <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">🌿</div>
                <h3 className="font-bold text-lg mb-2">Natural Feeding</h3>
                <p className="text-sm text-muted-foreground">
                  Balanced and chemical-free feed ensures strong growth and better nutrition.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold text-lg mb-2">Strict Hygiene</h3>
                <p className="text-sm text-muted-foreground">
                  Clean housing and regular health checks maintain top-quality standards.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">🚜</div>
                <h3 className="font-bold text-lg mb-2">Sustainable Farming</h3>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly practices that support long-term farm productivity.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
