import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import eggsBasket from "@/assets/eggs-basket.jpg";
import chickensFeed from "@/assets/chickens-feeding.jpg";
import poultryFeed from "@/assets/poultry-feed.jpg";
import rooster from "@/assets/rooster-portrait.jpg";

const products = [
  {
    img: eggsBasket,
    title: "Fresh Organic Eggs",
    desc: "Our free-range hens produce nutrient-rich eggs daily. Available in various sizes and packaging options for retail and wholesale.",
    price: "From $4.99/dozen",
  },
  {
    img: chickensFeed,
    title: "Day-Old Chicks",
    desc: "Vaccinated, healthy day-old chicks bred for both broiler and layer production. Available in bulk for commercial farmers.",
    price: "From $1.50/chick",
  },
  {
    img: poultryFeed,
    title: "Premium Poultry Feed",
    desc: "Scientifically formulated feed blends for starter, grower, and layer phases. Enriched with essential vitamins and minerals.",
    price: "From $25/bag",
  },
  {
    img: rooster,
    title: "Breeding Stock",
    desc: "Premium breeding roosters and hens for improving flock genetics. Health-certified and from top bloodlines.",
    price: "From $15/bird",
  },
];

const services = [
  { title: "Farm Consultation", desc: "Expert advice on setting up and managing your poultry farm for maximum productivity." },
  { title: "Veterinary Services", desc: "Regular health checks, vaccination programs, and disease management solutions." },
  { title: "Training Programs", desc: "Hands-on workshops for both beginner and experienced poultry farmers." },
  { title: "Supply Chain Solutions", desc: "End-to-end logistics support for getting your products to market efficiently." },
];

const Products = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-farm-dark section-padding text-center">
        <div className="container-max">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-background mb-4">Products & Services</h1>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              Premium poultry products and professional services to support your farming journey.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Products</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, i) => (
              <AnimatedSection key={product.title} delay={i * 0.1}>
                <div className="group rounded-lg overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300">
                  <div className="overflow-hidden h-60">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-heading font-bold text-foreground text-lg">{product.title}</h3>
                      <span className="text-sm font-semibold text-secondary bg-farm-green-light px-3 py-1 rounded-full whitespace-nowrap ml-2">
                        {product.price}
                      </span>
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

      {/* Services */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Services</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <AnimatedSection key={s.title} delay={i * 0.1}>
                <div className="p-6 bg-card rounded-lg border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  <h3 className="font-heading font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-max text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-heading font-bold text-secondary-foreground mb-4">Need a Custom Order?</h2>
            <p className="text-secondary-foreground/80 max-w-xl mx-auto mb-8">
              We cater to both small-scale farmers and large commercial operations. Contact us for wholesale pricing and custom solutions.
            </p>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 bg-background text-secondary font-semibold rounded-md hover:scale-105 transition-transform duration-200"
            >
              Contact Us
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
