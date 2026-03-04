import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  toast({
    title: "Thank You! ✅",
    description: "Your message has been received successfully.",
  });

  setForm({ name: "", email: "", phone: "", subject: "", message: "" });
};
  return (
    <Layout>
     {/* Hero */}
<section className="relative h-[50vh] min-h-[350px] flex items-center overflow-hidden">
  
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
      alt="Contact our poultry farm team"
      className="w-full h-full object-cover"
    />
    {/* Better dark overlay */}
    <div className="absolute inset-0 bg-black/60 dark:bg-black/70" />
  </div>

  <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
    <AnimatedSection>
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
        Contact Us
      </h1>
      <p className="text-white/80 text-lg max-w-2xl mx-auto">
        Have questions or need assistance? Our team is here to support you with reliable guidance and prompt responses.
      </p>
    </AnimatedSection>
  </div>
</section>
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <AnimatedSection className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Get in Touch</h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                    { icon: Mail, label: "Email", value: "info@yourpoultrybrand.com" },
                    { icon: MapPin, label: "Address", value: "123 Farm Road, Rural County, State 12345" },
                    { icon: Clock, label: "Hours", value: "Mon–Fri: 8am–6pm, Sat: 9am–3pm" },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-farm-red-light flex items-center justify-center text-primary">
                        <item.icon size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{item.label}</div>
                        <div className="text-sm text-muted-foreground">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook, label: "Facebook", href: "#" },
                    { icon: Instagram, label: "Instagram", href: "#" },
                    { icon: Twitter, label: "Twitter", href: "#" },
                    { icon: Youtube, label: "YouTube", href: "#" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="lg:col-span-3" delay={0.15}>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject *</label>
                    <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="How can we help?" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    placeholder="Tell us more about your needs..." />
                </div>
                <button type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 hover:scale-[1.02] transition-all duration-200">
                  Send Message
                </button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-80">
        <iframe
          title="Location Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-74.006%2C40.7128%2C-73.95%2C40.75&layer=mapnik"
          className="w-full h-full border-0"
          loading="lazy"
        />
      </section>
    </Layout>
  );
};

export default Contact;
