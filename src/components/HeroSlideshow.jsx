import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Import your local images
import hero1 from "../assets/img/1.jpg";
import hero2 from "../assets/img/2.jpg";
import hero3 from "../assets/img/3.jpg";
import hero4 from "../assets/img/still-valey-MK-2.jpg";

export default function HeroSlideshow() {
  // Array of slides with image and content
  const slides = [
    {
      image: hero1,
      title: "Experience Luxury",
      subtitle: "Where comfort meets elegance in every corner",
      cta: "Explore Rooms",
      link: "/rooms"
    },
    {
      image: hero4,
      title: "Memorable Events",
      subtitle: "Perfect venues for your special occasions",
      cta: "View Venues",
      link: "/wedding-hall"
    },
    {
      image: hero2,
      title: "Fine Dining",
      subtitle: "Savor exquisite cuisine in a stunning atmosphere",
      cta: "Discover Dining",
      link: "/dining-hall"
    },
    {
      image: hero3,
      title: "Premium Membership",
      subtitle: "Join our exclusive club for special privileges",
      cta: "Join Now",
      link: "/membership"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Navigation functions
  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % slides.length
    );
  };

  // Slide variants for animations
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0
    })
  };

  // Content variants for animations
  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.3
      }
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slideshow */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 1,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${slides[currentIndex].image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        />
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75 z-10"></div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 z-20">
        <motion.div
          key={`content-${currentIndex}`}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="text-center text-white max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wider">
            {slides[currentIndex].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            {slides[currentIndex].subtitle}
          </p>
          <Link
            to={slides[currentIndex].link}
            className="inline-block bg-[#5b3016] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#6d3a1c] transition-all duration-300 transform hover:scale-105"
          >
            {slides[currentIndex].cta}
          </Link>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4 z-30 pointer-events-none">
        <button
          onClick={handlePrevious}
          className="bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm pointer-events-auto"
          aria-label="Previous slide"
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <button
          onClick={handleNext}
          className="bg-black/30 hover:bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm pointer-events-auto"
          aria-label="Next slide"
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((slide, index) => (
          <Link
            key={index}
            to={slide.link}
            onClick={(e) => {
              e.preventDefault();
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1} - ${slide.title}`}
          />
        ))}
      </div>
    </section>
  );
}
