import React from "react";
import { Link } from "react-router-dom";
import HeroSlideshow from "../components/HeroSlideshow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpa,
  faUtensils,
  faBed,
  faSwimmingPool,
  faWifi,
  faCocktail,
  faCrown,
  faUsers,
  faCoffee,
  faParking,
} from "@fortawesome/free-solid-svg-icons";
import img1 from '../assets/img/1.jpg'
import img2 from '../assets/img/2.jpg'
import img3 from '../assets/img/3.jpg'
import room1 from '../assets/img/12.jpg'
import room2 from '../assets/img/14.jpg'
import OffferImage from '../assets/img/2.jpg'

export default function Home() {
  const features = [
    { icon: faUtensils, title: "Fine Dining", description: "Indulge in exquisite cuisines from around the world, prepared by our master chefs." },
    { icon: faSpa, title: "Spa & Wellness", description: "Relax and rejuvenate with our luxurious spa treatments and wellness programs." },
    { icon: faBed, title: "Grand Suites", description: "Experience the pinnacle of luxury in our spacious suites, offering panoramic views." },
    { icon: faSwimmingPool, title: "Swimming Pool", description: "Take a refreshing dip in our infinity pool with stunning views." },
    { icon: faWifi, title: "High-Speed WiFi", description: "Stay connected with complimentary high-speed internet throughout the resort." },
    { icon: faCocktail, title: "Premium Bar", description: "Enjoy handcrafted cocktails and premium spirits at our elegant bar." }
  ];

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <HeroSlideshow/>

      {/* Welcome Section */}
      <section className="py-20 px-4 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] bg-clip-text text-transparent">
            Welcome to Luxury & Comfort
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Experience unparalleled hospitality at Vartika Hotel Funpark & Resort, where every moment is crafted for your ultimate comfort and enjoyment.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 md:px-12 text-black lg:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r   from-[#AF8E2F] to-[#8B721F] bg-clip-text text-transparent">
              Resort Amenities
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
                <div className="w-14 h-14 bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] rounded-full flex items-center justify-center mb-6">
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Activities Section */}
      <section className="py-20 px-4 text-black md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] bg-clip-text text-transparent">
              Fun Activities & Entertainment
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden rounded-2xl">
              <img src={img1} alt="Water Park" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">Water Park</h3>
                  <p className="text-sm text-gray-200 mb-4">Experience thrilling water slides and wave pools</p>
                  <Link to="/activities" className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl">
              <img src={img2} alt="Adventure Zone" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">Adventure Zone</h3>
                  <p className="text-sm text-gray-200 mb-4">Exciting activities for all age groups</p>
                  <Link to="/activities" className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl">
              <img src={img3} alt="Kids Play Area" className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">Kids Play Area</h3>
                  <p className="text-sm text-gray-200 mb-4">Safe and fun environment for children</p>
                  <Link to="/activities" className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding & Events */}
      <section className="py-20 px-4 text-black md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] bg-clip-text text-transparent">
              Weddings & Special Events
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Create Unforgettable Moments</h3>
              <p className="text-gray-600">
                Host your dream wedding or special event in our elegant venues. Our experienced team will ensure every detail is perfect.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faCrown} className="text-[#AF8E2F]" />
                  </div>
                  <span>Luxurious Wedding Halls</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faUtensils} className="text-[#AF8E2F]" />
                  </div>
                  <span>Custom Catering Services</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faCocktail} className="text-[#AF8E2F]" />
                  </div>
                  <span>Event Planning Assistance</span>
                </li>
              </ul>
              <Link
                to="/wedding-hall"
                className="inline-block bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#8B721F] hover:to-[#AF8E2F] transform hover:scale-105 transition-all duration-300"
              >
                Explore Wedding Packages
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={room1} alt="Wedding Hall" className="w-full h-48 object-cover rounded-lg" />
              <img src={room2} alt="Wedding Setup" className="w-full h-48 object-cover rounded-lg" />
              <img src={img2} alt="Event Space" className="w-full h-48 object-cover rounded-lg" />
              <img src={img3} alt="Decoration" className="w-full h-48 object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Dining Experience */}
      <section className="py-20 px-4 text-black md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] bg-clip-text text-transparent">
              Exquisite Dining Experience
            </span>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative overflow-hidden rounded-2xl">
              <img src={img1} alt="Restaurant" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-3xl font-semibold mb-4">Multi-Cuisine Restaurant</h3>
                  <p className="text-gray-200 mb-6">Experience the finest dining with our expert chefs serving both local and international cuisines.</p>
                  <Link
                    to="/dining-hall"
                    className="inline-block bg-white text-[#AF8E2F] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
                  >
                    View Menu
                  </Link>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Special Offers</h4>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faUtensils} className="text-[#AF8E2F]" />
                    <span>20% off on Family Dinners</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faCocktail} className="text-[#AF8E2F]" />
                    <span>Happy Hours: 6PM - 8PM</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Opening Hours</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>Breakfast: 7:00 AM - 10:30 AM</li>
                  <li>Lunch: 12:30 PM - 3:00 PM</li>
                  <li>Dinner: 7:00 PM - 10:30 PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-20 px-4 text-black md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] bg-clip-text text-transparent">
              Luxury Accommodations
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Room 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room1}
                  alt="Deluxe Room"
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-[#AF8E2F] font-semibold">Rs.1200</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Deluxe Room</h3>
                <p className="text-gray-600 mb-4">
                  A perfect blend of comfort and luxury for your short stay.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faBed} className="text-[#AF8E2F]" />
                    <span className="text-sm text-gray-600">2 Queen Beds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUsers} className="text-[#AF8E2F]" />
                    <span className="text-sm text-gray-600">Up to 4 Guests</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  {[faWifi, faCoffee, faParking].map((icon, index) => (
                    <div key={index} className="w-8 h-8 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={icon} className="text-[#AF8E2F] text-sm" />
                    </div>
                  ))}
                </div>
                <Link
                  to="/rooms/deluxe"
                  className="inline-block w-full bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-[#8B721F] hover:to-[#AF8E2F] transform hover:scale-[1.02] transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Room 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room2}
                  alt="Executive Suite"
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-[#AF8E2F] font-semibold">Rs.1800</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Executive Suite</h3>
                <p className="text-gray-600 mb-4">
                  Enjoy top-tier amenities and spacious living areas for a perfect getaway.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faBed} className="text-[#AF8E2F]" />
                    <span className="text-sm text-gray-600">1 King Bed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUsers} className="text-[#AF8E2F]" />
                    <span className="text-sm text-gray-600">Up to 2 Guests</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  {[faWifi, faCoffee, faParking, faCocktail].map((icon, index) => (
                    <div key={index} className="w-8 h-8 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={icon} className="text-[#AF8E2F] text-sm" />
                    </div>
                  ))}
                </div>
                <Link
                  to="/rooms/executive"
                  className="inline-block w-full bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-[#8B721F] hover:to-[#AF8E2F] transform hover:scale-[1.02] transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>

            {/* Room 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={img3}
                  alt="Family Suite"
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-[#AF8E2F] font-semibold">Rs. 2500</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">Family Suite</h3>
                <p className="text-gray-600 mb-4">
                  Spacious suite perfect for families, with connecting rooms and play area.
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faBed} className="text-[#AF8E2F]" />
                    <span className="text-sm text-gray-600">2 King Beds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUsers} className="text-[#AF8E2F]" />
                    <span className="text-sm text-gray-600">Up to 6 Guests</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 mb-6">
                  {[faWifi, faCoffee, faParking, faCocktail].map((icon, index) => (
                    <div key={index} className="w-8 h-8 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={icon} className="text-[#AF8E2F] text-sm" />
                    </div>
                  ))}
                </div>
                <Link
                  to="/rooms/family"
                  className="inline-block w-full bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] text-white px-6 py-3 rounded-lg font-semibold text-center hover:from-[#8B721F] hover:to-[#AF8E2F] transform hover:scale-[1.02] transition-all duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Luxury Today */}
      <section className="relative py-20 overflow-hidden bg-black">
        {/* Background Design Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent z-10"></div>
          <img 
            src={OffferImage} 
            alt="Luxury Suite" 
            className="w-full h-full object-cover object-center animate-slow-zoom opacity-60"
          />
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20"></div>
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#AF8E2F]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-[#AF8E2F]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-xl rounded-full px-6 py-2 mb-6 border border-white/10">
              <div className="w-2 h-2 bg-[#AF8E2F] rounded-full animate-pulse"></div>
              <span className="text-white/90 text-sm font-medium tracking-wide uppercase">Limited Time Offers</span>
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#AF8E2F] to-[#D4AF37] bg-clip-text text-transparent">
              Experience Luxury Today
            </h2>
            
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Discover our exclusive packages designed for unforgettable moments at FunPark Resort
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Premium Weekend Package */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#AF8E2F] transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="inline-block px-4 py-1 bg-[#AF8E2F]/20 text-[#AF8E2F] rounded-full text-sm font-medium mb-4">
                    Save 20%
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">Premium Weekend</h3>
                  <p className="text-white/60">2 Nights of Pure Luxury</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">Rs. 2000</div>
                  <div className="text-white/60">per night</div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/80">
                  <div className="w-10 h-10 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faCrown} className="text-[#AF8E2F]" />
                  </div>
                  <span>Luxury Suite Accommodation</span>
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-10 h-10 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faUtensils} className="text-[#AF8E2F]" />
                  </div>
                  <span>Gourmet Breakfast & Dinner</span>
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-10 h-10 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faSpa} className="text-[#AF8E2F]" />
                  </div>
                  <span>Complimentary Spa Treatment</span>
                </li>
              </ul>
              
              <Link
                to="/offers"
                className="block w-full bg-[#AF8E2F] hover:bg-[#8B721F] text-white text-center py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Book This Package
              </Link>
            </div>

            {/* Family Getaway Package */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-[#AF8E2F] transition-all duration-300">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="inline-block px-4 py-1 bg-[#AF8E2F]/20 text-[#AF8E2F] rounded-full text-sm font-medium mb-4">
                    Save 30%
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">Family Getaway</h3>
                  <p className="text-white/60">4 Nights of Fun & Relaxation</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white">Rs. 1800</div>
                  <div className="text-white/60">per night</div>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white/80">
                  <div className="w-10 h-10 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faUtensils} className="text-[#AF8E2F]" />
                  </div>
                  <span>All-Inclusive Meals</span>
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-10 h-10 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faSwimmingPool} className="text-[#AF8E2F]" />
                  </div>
                  <span>Unlimited Water Park Access</span>
                </li>
                <li className="flex items-center text-white/80">
                  <div className="w-10 h-10 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center mr-4">
                    <FontAwesomeIcon icon={faCocktail} className="text-[#AF8E2F]" />
                  </div>
                  <span>Evening Entertainment</span>
                </li>
              </ul>
              
              <Link
                to="/offers"
                className="block w-full bg-[#AF8E2F] hover:bg-[#8B721F] text-white text-center py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Book This Package
              </Link>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}
