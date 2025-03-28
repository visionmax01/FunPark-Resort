import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faFacebookF, 
    faTwitter, 
    faInstagram, 
    faLinkedinIn 
} from "@fortawesome/free-brands-svg-icons";
import { 
    faMapMarkerAlt, 
    faPhone, 
    faEnvelope 
} from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-gray-300">
            {/* Main Footer */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Vartika Hotel Funpark & Resort offers a perfect blend of luxury, comfort, and entertainment.
                            Experience world-class amenities and create unforgettable memories with us.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/rooms" className="hover:text-white transition-colors">Rooms</Link></li>
                            <li><Link to="/dining-hall" className="hover:text-white transition-colors">Dining</Link></li>
                            <li><Link to="/wedding-hall" className="hover:text-white transition-colors">Wedding Hall</Link></li>
                            <li><Link to="/membership" className="hover:text-white transition-colors">Membership</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                                <span>Bharatpur-10, Chitwan, Nepal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faPhone} className="text-gray-400" />
                                <span>+977-980-0000000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                                <span>info@vartikaresort.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-sm text-gray-400 mb-4">Subscribe to our newsletter for updates and special offers.</p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-gray-500 text-white"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-[#5b3016] hover:bg-[#6d3a1c] transition-colors rounded-md text-white font-medium"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="border-t border-gray-700 mt-8 pt-8">
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FontAwesomeIcon icon={faFacebookF} size="lg" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto px-4 text-center text-sm">
                    <p>&copy; {currentYear} Vartika Hotel Funpark & Resort. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}