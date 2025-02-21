import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import your local images
import hero1 from "../assets/img/1.jpg";
import hero2 from "../assets/img/2.jpg";
import hero3 from "../assets/img/3.jpg";
import hero4 from "../assets/img/still-valey-MK-2.jpg";

export default function HeroSlideshow() {
  // Array of local background images
  const images = [hero1,hero4, hero2, hero3 ];

  // Current index of the background image
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Variants for swipe transition (from left to right)
  const variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* AnimatePresence handles exit animations */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            backgroundImage: `url(${images[currentIndex]})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      </AnimatePresence>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider">
          Experience Luxury
        </h1>
        <p className="mt-4 text-lg md:text-2xl max-w-xl mx-auto">
          Welcome to <span className="text-[#AF8E2F] font-semibold">Hotel Vartika  </span> – where comfort meets elegance in every corner.
        </p>
        <Link
          to="/rooms"
          className="inline-block bg-[#AF8E2F] text-white px-6 py-3 mt-6 rounded-lg text-lg font-semibold hover:bg-[#936f22] transition-colors"
        >
          Explore Rooms
        </Link>
      </div>
    </section>
  );
}
