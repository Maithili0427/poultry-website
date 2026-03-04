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
    excerpt:
      "Learn the essentials of free-range poultry farming, from proper nutrition to disease prevention and pasture management.",
    date: "Feb 15, 2026",
    category: "Farming Tips",
  },
  {
    img: eggsBasket,
    title: "Understanding Egg Nutrition: What Makes a Quality Egg?",
    excerpt:
      "Discover what factors contribute to egg quality and why free-range eggs are considered nutritionally superior.",
    date: "Feb 10, 2026",
    category: "Nutrition",
  },
  {
    img: poultryFeed,
    title: "The Complete Guide to Poultry Feed Formulation",
    excerpt:
      "A comprehensive look at formulating the perfect feed mix for different stages of poultry growth and production.",
    date: "Feb 5, 2026",
    category: "Feed & Nutrition",
  },
  {
    img: heroFarm,
    title: "Sustainable Poultry Farming Practices for 2026",
    excerpt:
      "Explore eco-friendly farming methods that reduce environmental impact while maintaining profitability.",
    date: "Jan 28, 2026",
    category: "Sustainability",
  },
  {
    img: rooster,
    title: "Selecting the Right Breeds for Your Farm",
    excerpt:
      "A guide to choosing the best chicken breeds based on your farming goals, climate, and market demand.",
    date: "Jan 20, 2026",
    category: "Breeds",
  },
  {
    img: aboutFarm,
    title: "Modern Poultry Housing: Design & Best Practices",
    excerpt:
      "How to design and build poultry housing that maximizes comfort, productivity, and biosecurity.",
    date: "Jan 15, 2026",
    category: "Infrastructure",
  },
];

const Blog = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=1600&q=80"
            alt="Poultry farming blog and articles"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay improved */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
        </div>

        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Blog & Articles
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Expert insights, practical tips, and the latest updates from the
              poultry farming industry.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="section-padding bg-background">
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
                      <span className="text-xs font-semibold text-secondary bg-secondary/20 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {post.excerpt}
                    </p>

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

     
    </Layout>
  );
};

export default Blog;