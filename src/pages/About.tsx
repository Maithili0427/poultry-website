import { Link } from "react-router-dom";
import { Users, Target, Award, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import aboutFarm from "@/assets/about-farm.jpg";
import rooster from "@/assets/rooster-portrait.jpg";
import { motion } from "framer-motion";

const values = [
  { icon: Target, title: "Our Mission", desc: "To provide sustainable, high-quality poultry products while supporting local farming communities with knowledge and resources." },
  { icon: Award, title: "Quality First", desc: "Every product goes through rigorous quality checks to ensure it meets international standards for health and safety." },
  { icon: Heart, title: "Animal Welfare", desc: "We believe in ethical farming practices that prioritize the well-being and comfort of our poultry." },
  { icon: Users, title: "Community", desc: "Building strong relationships with farmers, suppliers, and customers to create a thriving poultry ecosystem." },
];

const About = () => {
  return (
    <Layout>
     {/* Hero */}
<section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
  <div className="absolute inset-0">
    
    <motion.img
      src={aboutFarm}
      alt="Modern poultry farm aerial view"
      className="w-full h-full object-cover"
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    />

    <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
  </div>

  <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
    <AnimatedSection>
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
        About Us
      </h1>

      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Decades of experience in poultry farming, dedicated to excellence and sustainability.
      </p>
    </AnimatedSection>
  </div>
</section>

      {/* Story */}
<section className="section-padding bg-background text-foreground">
  <div className="container-max">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Content */}
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
          Our Story
        </h2>

        <p className="text-muted-foreground leading-relaxed mb-4">
          What started as a small family-run poultry farm with just a few hens 
          and a big dream has grown into one of the region’s most trusted poultry 
          suppliers. Our journey began with a simple mission — to provide fresh, 
          healthy, and naturally produced poultry products to local families.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          Through dedication, hard work, and modern farming techniques, we 
          steadily expanded our operations while maintaining strict hygiene 
          standards and ethical farming practices. Every egg, every chick, 
          and every bag of feed reflects our commitment to quality and care.
        </p>

        

        <p className="text-muted-foreground leading-relaxed mb-6">
          Today, we proudly serve households, retailers, and commercial farmers 
          across the region. For us, poultry farming is not just a business — 
          it’s a responsibility toward community nutrition, rural development, 
          and building a healthier future for the next generation.
        </p>

        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 hover:scale-105 transition-all duration-200"
        >
          Get in Touch
        </Link>
      </AnimatedSection>

      {/* Right Image */}
      <AnimatedSection delay={0.2}>
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={rooster}
            alt="Healthy rooster portrait"
            className="w-full h-80 lg:h-96 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </AnimatedSection>

    </div>
  </div>
</section>
      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Our Values
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="flex gap-4 p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground">
                    <v.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Poultry Impact Section */}
<section className="section-padding bg-background">
  <div className="container-max">

    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-4">
        Our Poultry Farm Impact
      </h2>
      <p className="max-w-2xl mx-auto text-muted-foreground">
        We combine modern poultry technology, hygienic processing, and
        sustainable farming practices to deliver fresh, high-quality poultry products.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

      {[
        { icon: "🐓", num: "50,000+", label: "Healthy Birds Raised Annually" },
        { icon: "🥚", num: "15M+", label: "Fresh Eggs Supplied Every Year" },
        { icon: "🚚", num: "120+", label: "Daily Deliveries to Markets & Stores" },
        { icon: "🌱", num: "100%", label: "Natural Feed & Hygienic Farming" },
      ].map((stat, i) => (
        <AnimatedSection key={stat.label} delay={i * 0.1}>
          <div className="bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-green-600">
            
            <div className="text-4xl mb-4">{stat.icon}</div>

            <div className="text-3xl font-bold text-green-600 mb-2">
              {stat.num}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {stat.label}
            </p>

          </div>
        </AnimatedSection>
      ))}

    </div>
  </div>
</section>
    </Layout>
  );
};

export default About;