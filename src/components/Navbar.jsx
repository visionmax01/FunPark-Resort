import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModal";
import Logo from '../assets/img/main-logoo.jpg';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  // Check if current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check auth on mount and on location change
  useEffect(() => {
    checkAuth();
  }, [location]);

  // Listen for storage events (changes from other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleDrawer = () => setIsOpen(!isOpen);

  const toggleModal = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleAccountClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    if (user?.role === 1) {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    checkAuth();
    navigate("/");
    setIsOpen(false); // Close mobile menu if open
  };

  const drawerVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <nav className="bg-white sticky top-0 z-50 px-4 py-2 text-[#5b3016] shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Brand Logo */}
        <Link
          to="/"
          className="text-xl font-bold flex gap-2 uppercase tracking-wide hover:opacity-80"
        >
          <img src={Logo} alt="Logo" className="h-14" />
        </Link>

        {/* Center-Right Section: Large Screen Menu */}
        <div className="hidden md:flex items-center space-x-8 uppercase font-semibold">
          <Link 
            to="/rooms" 
            className={`hover:text-gray-600 ${isActive('/rooms') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
          >
            Rooms
          </Link>
          <Link 
            to="/dining-hall" 
            className={`hover:text-gray-600 ${isActive('/dining-hall') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
          >
            Dining Hall
          </Link>
          <Link 
            to="/wedding-hall" 
            className={`hover:text-gray-600 ${isActive('/wedding-hall') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
          >
            Wedding Hall
          </Link>
          <Link 
            to="/membership" 
            className={`hover:text-gray-600 ${isActive('/membership') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
          >
            Memberships
          </Link>
          <Link 
            to="/contact" 
            className={`hover:text-gray-600 ${isActive('/contact') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
          >
            Contact
          </Link>

          {/* Conditional Login/My Account */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleAccountClick} 
                className="hover:text-gray-600 border-[#AF8E2F] cursor-pointer border-2 hover:bg-[#AF8E2F] hover:text-white px-4 py-2 rounded transition-colors"
              >
                My Account
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className={`hover:text-gray-600 border-[#AF8E2F] cursor-pointer border-2 hover:bg-[#AF8E2F] hover:text-white px-4 py-2 rounded transition-colors ${isActive('/login') ? 'bg-[#AF8E2F] text-white' : ''}`}
            >
              Login / Join
            </Link>
          )}

          {/* "Book Now" Button */}
          <button
            className="border border-[#AF8E2F] px-4 py-2 rounded hover:bg-[#AF8E2F] hover:text-white transition-colors"
            onClick={toggleModal} 
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
            <div className="flex flex-col p-4 space-y-4 uppercase font-semibold text-[#5b3016]">
              <Link 
                to="/rooms" 
                onClick={() => setIsOpen(false)} 
                className={`hover:text-gray-600 ${isActive('/rooms') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
              >
                Rooms
              </Link>
              <Link 
                to="/dining-hall" 
                onClick={() => setIsOpen(false)} 
                className={`hover:text-gray-600 ${isActive('/dining-hall') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
              >
                Dining Hall
              </Link>
              <Link 
                to="/wedding-hall" 
                onClick={() => setIsOpen(false)} 
                className={`hover:text-gray-600 ${isActive('/wedding-hall') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
              >
                Wedding Hall
              </Link>
              <Link 
                to="/membership" 
                onClick={() => setIsOpen(false)} 
                className={`hover:text-gray-600 ${isActive('/membership') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
              >
                Memberships
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)} 
                className={`hover:text-gray-600 ${isActive('/contact') ? 'text-[#AF8E2F] border-b-2 border-[#AF8E2F] pb-1' : ''}`}
              >
                Contact
              </Link>

              {/* Conditional Login/My Account */}
              {isLoggedIn ? (
                <>
                  <button 
                    onClick={() => {
                      handleAccountClick();
                      setIsOpen(false);
                    }} 
                    className="hover:text-gray-600 border-[#AF8E2F] cursor-pointer border-2 hover:bg-[#AF8E2F] hover:text-white px-4 py-2 rounded transition-colors"
                  >
                    My Account
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className={`hover:text-gray-600 border-[#AF8E2F] cursor-pointer border-2 hover:bg-[#AF8E2F] hover:text-white px-4 py-2 rounded transition-colors ${isActive('/login') ? 'bg-[#AF8E2F] text-white' : ''}`}
                >
                  Login / Join
                </Link>
              )}

              <button 
                onClick={() => {
                  toggleModal();
                  setIsOpen(false);
                }} 
                className="border border-[#AF8E2F] px-4 py-2 rounded hover:bg-[#AF8E2F] hover:text-white transition-colors"
              >
                Book Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={toggleModal} />
    </nav>
  );
}