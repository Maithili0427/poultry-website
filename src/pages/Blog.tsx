import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import eggsBasket from "@/assets/eggs-basket.jpg";
import chickensFeed from "@/assets/chickens-feeding.jpg";
import poultryFeed from "@/assets/poultry-feed.jpg";
import heroFarm from "@/assets/hero-farm.jpg";
import rooster from "@/assets/rooster-portrait.jpg";
import aboutFarm from "@/assets/about-farm.jpg";

const posts = [
  {
    img: chickensFeed,
    title: "10 Tips for Raising Healthy Free-Range Chickens",
    excerpt: "Learn the essentials of free-range poultry farming, from proper nutrition to disease prevention and pasture management.",
    date: "Feb 15, 2026",
    category: "Farming Tips",
  },
  {
    img: eggsBasket,
    title: "Understanding Egg Nutrition: What Makes a Quality Egg?",
    excerpt: "Discover what factors contribute to egg quality and why free-range eggs are considered nutritionally superior.",
    date: "Feb 10, 2026",
    category: "Nutrition",
  },
  {
    img: poultryFeed,
    title: "The Complete Guide to Poultry Feed Formulation",
    excerpt: "A comprehensive look at formulating the perfect feed mix for different stages of poultry growth and production.",
    date: "Feb 5, 2026",
    category: "Feed & Nutrition",
  },
  {
    img: heroFarm,
    title: "Sustainable Poultry Farming Practices for 2026",
    excerpt: "Explore eco-friendly farming methods that reduce environmental impact while maintaining profitability.",
    date: "Jan 28, 2026",
    category: "Sustainability",
  },
  {
    img: rooster,
    title: "Selecting the Right Breeds for Your Farm",
    excerpt: "A guide to choosing the best chicken breeds based on your farming goals, climate, and market demand.",
    date: "Jan 20, 2026",
    category: "Breeds",
  },
  {
    img: aboutFarm,
    title: "Modern Poultry Housing: Design & Best Practices",
    excerpt: "How to design and build poultry housing that maximizes comfort, productivity, and biosecurity.",
    date: "Jan 15, 2026",
    category: "Infrastructure",
  },
];

const Blog = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-farm-dark section-padding text-center">
        <div className="container-max">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-background mb-4">Blog & Articles</h1>
            <p className="text-background/70 text-lg max-w-2xl mx-auto">
              Expert insights, tips, and news from the world of poultry farming.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <AnimatedSection key={post.title} delay={i * 0.1}>
                <article className="group rounded-lg overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="overflow-hidden h-48">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-secondary bg-farm-green-light px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                    <span className="text-sm font-semibold text-primary cursor-pointer hover:underline">
                      Read More →
                    </span>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-muted">
        <div className="container-max text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Stay Updated</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for the latest poultry farming tips, industry news, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-md text-sm hover:opacity-90 transition-opacity duration-200">
                Subscribe
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
