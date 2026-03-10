import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import UserTypeModel from "./UserTypeModel";

interface NavLink {
  to: string;
  label: string;
}

const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  const handleOrderClick = () => {
    navigate("/order");
  };

  const handleSignUpClick = () => {
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCloseMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">

        <div className="container-max px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">

              <img
                src="/logo.jpeg"
                alt="Poultry Logo"
                className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-md group-hover:scale-110 transition-transform duration-300"
              />

              <span className="font-serif font-bold text-lg md:text-xl text-foreground tracking-wider">
                ROYALROOST
              </span>

            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5">

              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-2 text-[17px] transition-all duration-200 ${
                  location.pathname === link.to
                  ? "font-bold text-black dark:text-white after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[3px] after:h-[3px] after:w-8 after:bg-secondary after:content-['']"
                  : "font-medium text-black dark:text-white hover:text-black dark:hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Order Button */}
              <button
                onClick={handleOrderClick}
                className="ml-4 px-6 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-[16px] font-semibold hover:scale-105 transition-all duration-200"
              >
                Order Now
              </button>

              {/* Signup */}
              {!isLoggedIn && (
                <button
                  onClick={handleSignUpClick}
                  className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-[16px] font-semibold hover:scale-105 transition-all duration-200"
                >
                  Sign Up
                </button>
              )}

              {/* Logout */}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="ml-2 px-5 py-2.5 bg-red-500 text-white rounded-lg text-[16px] font-semibold hover:scale-105 transition-all duration-200"
                >
                  Logout
                </button>
              )}

              <ThemeToggle />

            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
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
              className="md:hidden bg-background border-b border-border"
            >

              <div className="px-4 py-4 space-y-2">

                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={handleCloseMobileMenu}
                    className={`block px-4 py-3 rounded-md text-sm ${
                      location.pathname === link.to
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <button
                  onClick={() => {
                    handleCloseMobileMenu();
                    handleOrderClick();
                  }}
                  className="block w-full px-4 py-3 bg-secondary text-secondary-foreground rounded-md"
                >
                  Order Now
                </button>

                {!isLoggedIn && (
                  <button
                    onClick={() => {
                      handleCloseMobileMenu();
                      handleSignUpClick();
                    }}
                    className="block w-full px-4 py-3 bg-primary text-primary-foreground rounded-md"
                  >
                    Sign Up
                  </button>
                )}

                {isLoggedIn && (
                  <button
                    onClick={() => {
                      handleCloseMobileMenu();
                      handleLogout();
                    }}
                    className="block w-full px-4 py-3 bg-red-500 text-white rounded-md"
                  >
                    Logout
                  </button>
                )}

                <div className="flex justify-center mt-2">
                  <ThemeToggle />
                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

      </nav>

      <UserTypeModel isOpen={showModal} onClose={() => setShowModal(false)} />

    </>
  );
};

export default Navbar;