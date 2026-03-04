import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container-max section-padding pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 group mb-5">

              {/* Logo */}
              <div className="relative">
                <img
                  src="/logo.jpeg"
                  alt="RoyalRoost Logo"
                  className="w-14 h-14 rounded-full object-cover 
                             border-2 border-green-600 shadow-lg 
                             group-hover:scale-110 group-hover:border-red-600 
                             transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-green-600/20 group-hover:ring-red-500/30 transition-all duration-300"></div>
              </div>

              {/* Brand Name */}
              <span className="font-heading font-extrabold text-xl tracking-wide text-white group-hover:text-green-500 transition-colors duration-300">
                ROYALROOST
              </span>

            </Link>

            <p className="text-sm leading-relaxed mb-5 text-gray-400">
              Delivering premium poultry products with unmatched quality, 
              hygiene, and trust. Supporting farmers and consumers with excellence.
            </p>

            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/products", label: "Products" },
                { to: "/blog", label: "Blog" },
                { to: "/contact", label: "Contact Us" },
                { to: "/order", label: "Order Now" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-green-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">
              Our Products
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                Fresh Eggs
              </li>
              <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                Poultry Feed
              </li>
              <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                Day-Old Chicks
              </li>
              <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                Breeding Stock
              </li>
              <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                Farm Equipment
              </li>
              <li className="hover:text-green-500 transition-colors duration-200 cursor-pointer">
                Consultation
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-green-500 shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-green-500 shrink-0" />
                info@royalroost.com
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-green-500 shrink-0 mt-1" />
                123 Farm Road, Rural County, State 12345
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-14 pt-6 border-t border-zinc-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} ROYALROOST. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;