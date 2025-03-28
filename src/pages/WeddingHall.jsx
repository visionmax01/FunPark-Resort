// src/pages/WeddingHall.js

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRing, faUsers, faMusic, faUtensils, faCamera, faCake, faGlassCheers, faHeart } from "@fortawesome/free-solid-svg-icons";
import weddingImage from "../assets/img/2.jpg";

export default function WeddingHall() {
  const services = [
    {
      icon: faRing,
      title: "Ceremony Setup",
      description: "Beautiful altar and seating arrangement"
    },
    {
      icon: faUtensils,
      title: "Catering Service",
      description: "Custom menu and professional service"
    },
    {
      icon: faMusic,
      title: "Entertainment",
      description: "Sound system and dance floor"
    },
    {
      icon: faCamera,
      title: "Photography Spots",
      description: "Perfect backdrops for memories"
    }
  ];

  const features = [
    {
      icon: faUsers,
      title: "Capacity",
      value: "Up to 500 guests"
    },
    {
      icon: faCake,
      title: "Services",
      value: "Full-service planning"
    },
    {
      icon: faGlassCheers,
      title: "Bar Service",
      value: "Premium packages"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative h-[35vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={weddingImage}
            alt="Wedding Hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#AF8E2F]/60 to-black/50" />

        </div>
        <div className="relative container mx-auto h-full flex flex-col justify-center px-6">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Wedding Hall</span>
          </nav>
          <h1 className="text-5xl font-bold text-white mb-4">
            Your Perfect Wedding Venue
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Create unforgettable memories in our elegant wedding hall
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-[#AF8E2F]/10 p-3 rounded-full">
                  <FontAwesomeIcon 
                    icon={feature.icon} 
                    className="text-2xl text-[#AF8E2F]"
                  />
                </div>
                <div>
                  <h3 className="text-gray-600">{feature.title}</h3>
                  <p className="text-lg font-semibold text-gray-900">{feature.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Wedding Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
              <div className="bg-[#AF8E2F]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FontAwesomeIcon 
                  icon={service.icon} 
                  className="text-2xl text-[#AF8E2F]"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <FontAwesomeIcon icon={faHeart} className="text-[#AF8E2F] text-4xl mb-4" />
              <h2 className="text-3xl font-bold text-gray-800">
                Your Dream Wedding Awaits
              </h2>
            </div>

            <div className="prose prose-lg mx-auto">
              <p className="text-gray-600 mb-6">
                Celebrate your special day in style at our luxurious Wedding Hall,
                designed to provide the perfect setting for your dream wedding. From
                the grand entrance to the final toast, every detail is crafted to
                ensure your day is unforgettable.
              </p>

              <div className="bg-[#AF8E2F]/5 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-[#AF8E2F] mb-4">
                  Venue Highlights
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                    Spacious and elegant venue
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                    Customizable decor and themes
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                    Experienced event planners
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                    State-of-the-art equipment
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 mb-8">
                Whether you're planning an intimate ceremony or a grand reception,
                our Wedding Hall provides the flexibility to accommodate any size
                and style of wedding. From floral arrangements to lighting, we take
                care of all the details so you can focus on enjoying your big day.
              </p>

              <div className="text-center">
                <button className="bg-[#AF8E2F] text-white px-8 py-3 rounded-full hover:bg-[#8B721F] transition-colors font-semibold">
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
