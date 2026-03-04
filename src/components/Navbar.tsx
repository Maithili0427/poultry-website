import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">

            {/* Circle Logo Image */}
            <img
              src="/logo.jpeg"
              alt="Poultry Logo"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md group-hover:scale-110 transition-transform duration-300"
            />

            {/* Brand Name */}
            <span className="font-heading font-bold text-lg text-foreground hidden sm:block">
              ROYALROOST
            </span>

          </Link>

         {/* Desktop Nav */}
<div className="hidden md:flex items-center gap-3">
  {navLinks.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        location.pathname === link.to
          ? "bg-primary text-primary-foreground"
          : "text-foreground hover:bg-muted hover:text-primary"
      }`}
    >
      {link.label}
    </Link>
  ))}

  <Link
    to="/order"
    className="ml-2 px-5 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-semibold hover:opacity-90 hover:scale-105 transition-all duration-200"
  >
    Order Now
  </Link>

  
  <ThemeToggle />
</div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
     <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden bg-background border-b border-border overflow-hidden"
    >
      <div className="px-4 py-4 space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
              location.pathname === link.to
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}

        <Link
          to="/order"
          onClick={() => setIsOpen(false)}
          className="block px-4 py-3 bg-secondary text-secondary-foreground rounded-md text-sm font-semibold text-center mt-2"
        >
          Order Now
        </Link>

        {/* 🔥 ADD THIS FOR MOBILE */}
        <div className="flex justify-center mt-3">
          <ThemeToggle />
        </div>

      </div>
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
};

export default Navbar;