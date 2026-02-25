import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Egg, Sprout, Truck, ShieldCheck, Play } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedHighlights from "@/components/AnimatedHighlights";
import heroFarm from "@/assets/hero-farm.jpg";
import eggsBasket from "@/assets/eggs-basket.jpg";
import chickensFeed from "@/assets/chickens-feeding.jpg";
import poultryFeed from "@/assets/poultry-feed.jpg";
import farmVideo from "@/assets/farm-video.mp4";

const features = [
  { icon: Egg, title: "Premium Eggs", desc: "Farm-fresh organic eggs from free-range hens, delivered daily." },
  { icon: Sprout, title: "Quality Feed", desc: "Nutrient-rich poultry feed formulated for optimal growth." },
  { icon: Truck, title: "Fast Delivery", desc: "Reliable supply chain ensuring freshness to your doorstep." },
  { icon: ShieldCheck, title: "Certified Quality", desc: "All products meet strict health and safety standards." },
];

const testimonials = [
  { name: "John M.", role: "Commercial Farmer", quote: "Best quality chicks and feed I've ever sourced. My flock's productivity increased by 30%!" },
  { name: "Sarah K.", role: "Restaurant Owner", quote: "Their farm-fresh eggs are exceptional. Our customers love the quality and we love the reliable delivery." },
  { name: "David L.", role: "Smallholder Farmer", quote: "The consultation service transformed my small farm into a profitable business. Highly recommended!" },
];

const Index = () => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[550px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroFarm} alt="Poultry farm at golden hour" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-farm-dark/60" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-background font-medium">Trusted by 5,000+ farmers nationwide</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-background leading-tight mb-4"
          >
            Your Trusted Poultry
            <br />
            <span className="text-primary">Partner</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mb-6"
          >
            <AnimatedHighlights />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto mb-8"
          >
            Premium poultry products, expert guidance, and sustainable farming solutions for a healthier tomorrow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/order"
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-all duration-200 hover:scale-105"
            >
              Order Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 bg-background/10 backdrop-blur-sm border border-background/30 text-background font-semibold rounded-md hover:bg-background/20 transition-all duration-200"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Animated Highlights Bar */}
      <section className="bg-secondary py-4">
        <div className="container-max flex flex-wrap justify-center gap-6 md:gap-12 text-secondary-foreground text-sm font-medium">
          {["🍳 Fresh Eggs Daily", "🐓 Healthy Poultry", "🌿 Farm to Table", "🛡️ Certified Quality", "🚚 Fast Delivery"].map((item) => (
            <span key={item} className="whitespace-nowrap">{item}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We deliver excellence in every aspect of poultry farming and products.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 0.1}>
                <div className="bg-card p-6 rounded-lg shadow-sm border border-border text-center group hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-farm-red-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <f.icon size={28} />
                  </div>
                  <h3 className="font-heading font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                See Our Farm in Action
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Take a virtual tour of our sustainable poultry farm. Watch how we raise healthy, free-range chickens with care and dedication to quality.
              </p>
              <ul className="space-y-3 mb-6">
                {["100% free-range environment", "Organic feed program", "Daily health monitoring", "Sustainable practices"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="inline-block px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity duration-200"
              >
                Learn About Us
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative rounded-lg overflow-hidden shadow-xl bg-farm-dark aspect-video">
                {!videoPlaying ? (
                  <div className="relative w-full h-full cursor-pointer group" onClick={() => setVideoPlaying(true)}>
                    <img src={heroFarm} alt="Farm video thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-farm-dark/40 flex items-center justify-center group-hover:bg-farm-dark/30 transition-colors duration-300">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <Play size={28} className="ml-1" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <video
                    src={farmVideo}
                    autoPlay
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Products</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">From farm-fresh eggs to premium feed — everything you need.</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: eggsBasket, title: "Fresh Organic Eggs", desc: "Free-range, hormone-free eggs packed with nutrients.", price: "$4.99/dozen" },
              { img: chickensFeed, title: "Day-Old Chicks", desc: "Healthy, vaccinated chicks for broiler and layer production.", price: "$1.50/chick" },
              { img: poultryFeed, title: "Premium Feed", desc: "Scientifically formulated feed for maximum growth and health.", price: "$25/bag" },
            ].map((product, i) => (
              <AnimatedSection key={product.title} delay={i * 0.15}>
                <div className="group rounded-lg overflow-hidden shadow-sm border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="overflow-hidden h-56">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading font-bold text-foreground">{product.title}</h3>
                      <span className="text-xs font-semibold text-secondary bg-farm-green-light px-2 py-1 rounded-full">{product.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{product.desc}</p>
                    <Link
                      to="/order"
                      className="inline-block px-5 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 hover:scale-105 transition-all duration-200"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What Our Customers Say</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                  <div className="text-primary text-2xl mb-3">★★★★★</div>
                  <p className="text-sm text-muted-foreground italic mb-4">"{t.quote}"</p>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="container-max text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Whether you're a farmer looking for quality supplies or a consumer seeking fresh products, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order"
                className="inline-block px-8 py-3 bg-background text-primary font-semibold rounded-md hover:scale-105 transition-transform duration-200"
              >
                Order Now
              </Link>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-primary-foreground/10 border border-primary-foreground/30 text-primary-foreground font-semibold rounded-md hover:bg-primary-foreground/20 transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
