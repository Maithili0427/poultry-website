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

    {/* ================= HERO SECTION ================= */}
<section className="relative h-[90vh] min-h-[550px] flex items-center overflow-hidden">
  
  <div className="absolute inset-0">
    
    <motion.img
      src={heroFarm}
      alt="Modern Poultry Farm"
      className="w-full h-full object-cover"
      initial={{ scale: 1.25 }}
      animate={{ scale: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    />

    <div className="absolute inset-0 bg-black/60" />
  </div>

  <div className="relative container-max text-center px-6">
    
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
    >
      Premium Poultry Solutions
      <br />
      <span className="text-primary">From Farm to Market</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8"
    >
      Delivering fresh eggs, healthy poultry, and sustainable farming
      excellence backed by innovation, hygiene, and trust.
    </motion.p>

    <div className="mb-8">
      <AnimatedHighlights />
    </div>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      
      <Link
        to="/order"
        className="px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-md hover:opacity-90 hover:scale-105 transition-all duration-200"
      >
        Order Now
      </Link>

      <Link
        to="/about"
        className="px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition-all duration-200"
      >
        Learn More
      </Link>

    </div>
  </div>

</section>
     {/* Features */}
<section className="section-padding bg-muted overflow-hidden">
  <div className="container-max">
    
    <AnimatedSection className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
        Why Choose Us
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        We deliver excellence in every aspect of poultry farming and products.
      </p>
    </AnimatedSection>

    <div className="overflow-hidden">
      
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...features, ...features].map((f, i) => (
          <AnimatedSection key={i}>
            <div className="min-w-[260px] bg-card p-6 rounded-lg shadow-sm border border-border text-center group hover:shadow-lg transition-all duration-300">
              
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-farm-red-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <f.icon size={28} />
              </div>

              <h3 className="font-heading font-bold text-foreground mb-2">
                {f.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {f.desc}
              </p>

            </div>
          </AnimatedSection>
        ))}
      </motion.div>

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

    {/* Section Heading */}
    <AnimatedSection className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
        Our Products
      </h2>
      <p className="text-muted-foreground max-w-xl mx-auto">
        From farm-fresh eggs to premium feed — everything you need.
      </p>
    </AnimatedSection>

    {/* Products Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
      {[
        {
          img: eggsBasket,
          title: "Fresh Organic Eggs",
          desc: "Free-range, hormone-free eggs packed with nutrients.",
           price: "₹180/dozen",
        },
        {
          img: chickensFeed,
          title: "Day-Old Chicks",
          desc: "Healthy, vaccinated chicks for broiler and layer production.",
          price: "From ₹100/chicks",
        },
        {
          img: poultryFeed,
          title: "Premium Feed",
          desc: "Scientifically formulated feed for maximum growth and health.",
          price: "₹2,000/bag",
        },
      ].map((product, i) => (
        <AnimatedSection key={product.title} delay={i * 0.15}>
          
          {/* Card */}
          <div className="group rounded-xl overflow-hidden shadow-md border border-border bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">

            {/* Image */}
            <div className="overflow-hidden aspect-[4/3]">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-heading font-bold text-foreground text-lg">
                  {product.title}
                </h3>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {product.price}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {product.desc}
              </p>

              {/* Button always bottom */}
              <Link
                to="/order"
                className="mt-auto flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:opacity-90 hover:scale-105 transition-all duration-200"
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
      

     {/* Our Farm Process */}
<section className="bg-background text-foreground section-padding">
  <div className="container-max text-center">
    
    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
      Our Farm Process
    </h2>

    <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
      We follow strict hygiene and quality standards to ensure every product 
      reaches you fresh, safe, and nutritious.
    </p>

    <div className="grid md:grid-cols-4 gap-8">
      
      {/* Step 1 */}
      <div className="bg-secondary text-secondary-foreground 
                      dark:bg-card dark:text-foreground 
                      border border-border 
                      p-6 rounded-xl shadow-sm 
                      hover:shadow-lg hover:-translate-y-2 
                      transition duration-300">
        <div className="text-4xl mb-4">🐣</div>
        <h3 className="text-xl font-semibold mb-2">Healthy Breeding</h3>
        <p className="text-sm opacity-90">
          Carefully selected breeds raised in a clean and safe environment.
        </p>
      </div>

      {/* Step 2 */}
      <div className="bg-secondary text-secondary-foreground 
                      dark:bg-card dark:text-foreground 
                      border border-border 
                      p-6 rounded-xl shadow-sm 
                      hover:shadow-lg hover:-translate-y-2 
                      transition duration-300">
        <div className="text-4xl mb-4">🌾</div>
        <h3 className="text-xl font-semibold mb-2">Nutritious Feed</h3>
        <p className="text-sm opacity-90">
          Balanced and organic feed to ensure healthy growth and quality.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-secondary text-secondary-foreground 
                      dark:bg-card dark:text-foreground 
                      border border-border 
                      p-6 rounded-xl shadow-sm 
                      hover:shadow-lg hover:-translate-y-2 
                      transition duration-300">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">Quality Check</h3>
        <p className="text-sm opacity-90">
          Every product undergoes strict quality inspection before delivery.
        </p>
      </div>

      {/* Step 4 */}
      <div className="bg-secondary text-secondary-foreground 
                      dark:bg-card dark:text-foreground 
                      border border-border 
                      p-6 rounded-xl shadow-sm 
                      hover:shadow-lg hover:-translate-y-2 
                      transition duration-300">
        <div className="text-4xl mb-4">🚚</div>
        <h3 className="text-xl font-semibold mb-2">Fresh Delivery</h3>
        <p className="text-sm opacity-90">
          Fast and hygienic delivery to maintain freshness and taste.
        </p>
      </div>

    </div>
  </div>
</section>
{/* Testimonials */}
<section className="section-padding bg-muted">
  <div className="container-max">
    <AnimatedSection className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
        What Our Customers Say
      </h2>
    </AnimatedSection>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          img: "https://randomuser.me/api/portraits/men/32.jpg",
          name: "Rahul Mapsekar",
          role: "Farm Owner",
          quote: "Excellent quality feed and healthy chicks. My farm productivity has improved significantly."
        },
        {
          img: "https://randomuser.me/api/portraits/women/44.jpg",
          name: "Suchita Naik",
          role: "Retail Buyer",
          quote: "The eggs are always fresh and hygienic. Highly recommended for quality products."
        },
        {
          img: "https://randomuser.me/api/portraits/men/75.jpg",
          name: "Amit Patil",
          role: "Distributor",
          quote: "Professional service and timely delivery. Truly reliable poultry partners."
        }
      ].map((t, i) => (
        <AnimatedSection key={t.name} delay={i * 0.1}>
          <div className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow duration-300 text-center">

            <img
              src={t.img}
              alt={t.name}
              className="w-20 h-20 mx-auto rounded-full object-cover mb-4 border-4 border-farm-green-light"
            />

           <div className="text-yellow-500 text-xl mb-3">★★★★★</div>

            <p className="text-sm text-muted-foreground italic mb-4">
              "{t.quote}"
            </p>

            <div className="text-sm font-semibold text-foreground">
              {t.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {t.role}
            </div>

          </div>
        </AnimatedSection>
      ))}
    </div>
  </div>
</section>
    </Layout>
  );
};

export default Index;
