import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const highlights = [
  { text: "Fresh Eggs Daily", emoji: "🍳" },
  { text: "Healthy Poultry", emoji: "🐓" },
  { text: "Farm to Table", emoji: "🌿" },
  { text: "Premium Quality", emoji: "⭐" },
];

const AnimatedHighlights = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % highlights.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 md:h-20 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center gap-3 text-2xl md:text-4xl font-heading font-bold"
        >
          <span className="text-primary">{highlights[index].text}</span>
          <span className="text-3xl md:text-5xl">{highlights[index].emoji}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHighlights;
