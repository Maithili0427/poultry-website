import { Link } from "react-router-dom";
import { Users, Target, Award, Heart } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import aboutFarm from "@/assets/about-farm.jpg";
import rooster from "@/assets/rooster-portrait.jpg";

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
          <img src={aboutFarm} alt="Modern poultry farm aerial view" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-farm-dark/60" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-background mb-4">About Us</h1>
            <p className="text-background/80 text-lg max-w-2xl mx-auto">
              Decades of experience in poultry farming, dedicated to excellence and sustainability.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded with a passion for poultry farming, Your Poultry Brand has grown from a small family farm into a trusted name in the industry. Our journey began with a simple belief: that quality poultry products should be accessible to everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Today, we serve thousands of customers across the region, providing premium eggs, day-old chicks, specialized feed, and expert consultation services. Our state-of-the-art facilities and dedicated team ensure that every product meets the highest standards.
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity duration-200"
              >
                Get in Touch
              </Link>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img src={rooster} alt="Healthy rooster portrait" className="w-full h-80 lg:h-96 object-cover" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container-max">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Our Values</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1}>
                <div className="flex gap-4 p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary flex items-center justify-center text-secondary-foreground">
                    <v.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-secondary">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "20+", label: "Years Experience" },
              { num: "5000+", label: "Happy Customers" },
              { num: "10M+", label: "Eggs Delivered" },
              { num: "50+", label: "Farm Partners" },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-secondary-foreground">
                  <div className="text-3xl md:text-4xl font-heading font-bold mb-1">{stat.num}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
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
