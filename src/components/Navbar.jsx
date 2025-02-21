// src/components/Navbar.js

import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModal";
import Logo from '../assets/img/logo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Toggle drawer
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Toggle modal for booking form
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const drawerVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <nav className="bg-white sticky top-0 z-50 px-4 py-2 text-[#AF8E2F] shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Brand Logo or Text */}
        <Link
          to="/"
          className="text-xl font-bold flex gap-2 uppercase tracking-wide hover:opacity-80"
        >
          {/* <p className="text-red-600 font-roboto"> Vartika Hotel </p> funpark <p className="text-red-600">&</p> resort */}
          <img src={Logo} alt="Logo" className="h-12" />
        </Link>

        {/* Center-Right Section: Large Screen Menu */}
        <div className="hidden md:flex items-center space-x-8 uppercase font-semibold">
          <Link to="/rooms" className="hover:text-gray-600">Rooms</Link>
          <Link to="/dining-hall" className="hover:text-gray-600">Dining hall</Link>
          <Link to="weeding-hall" className="hover:text-gray-600">Weeding Hall</Link>
          <Link to="/membership" className="hover:text-gray-600">Memberships</Link>
          <Link to="/contact" className="hover:text-gray-600">Contact</Link>
          
          <Link to="login" className="hover:text-gray-600">Login / Join</Link>

          {/* "Book Now" Button */}
          <button
            className="border border-[#AF8E2F] px-4 py-2 rounded hover:bg-[#AF8E2F] hover:text-white transition-colors"
            onClick={toggleModal} // Open the booking modal on click
          >
            Book Now
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button className="md:hidden" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-16 left-0 w-3/4 h-full bg-white z-50 md:hidden shadow-lg"
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-col p-4 space-y-4 uppercase font-semibold text-[#AF8E2F]">
            <Link to="/rooms" className="hover:text-gray-600">Rooms</Link>
            <Link to="/dining-hall" className="hover:text-gray-600">Dining hall</Link>
            <Link to="weeding-hall" className="hover:text-gray-600">Weeding Hall</Link>
            <Link to="/membership" className="hover:text-gray-600">Memberships</Link>
            <Link to="login" className="hover:text-gray-600">Login / Join</Link>
              <button onClick={toggleDrawer} className="border border-[#AF8E2F] px-4 py-2 rounded hover:bg-[#AF8E2F] hover:text-white transition-colors">Book Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={toggleModal} />
    </nav>
  );
}
