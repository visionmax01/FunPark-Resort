// src/pages/DiningHall.js

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faClock, faUsers, faWineGlass } from "@fortawesome/free-solid-svg-icons";
import diningImage from "../assets/img/1.jpg";

export default function DiningHall() {
  const features = [
    {
      icon: faUtensils,
      title: "International Cuisine",
      description: "Experience flavors from around the world"
    },
    {
      icon: faClock,
      title: "Opening Hours",
      description: "7:00 AM - 10:00 PM Daily"
    },
    {
      icon: faUsers,
      title: "Capacity",
      description: "Up to 200 guests"
    },
    {
      icon: faWineGlass,
      title: "Bar Service",
      description: "Premium wines and cocktails"
    }
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="relative h-[35vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={diningImage}
            alt="Dining Hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#AF8E2F]/60 to-black/50" />
          
        </div>
        <div className="relative container mx-auto h-full flex flex-col justify-center px-6">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Dining Hall</span>
          </nav>
          <h1 className="text-5xl font-bold text-white mb-4">
            Fine Dining Experience
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Indulge in exquisite cuisine in an atmosphere of elegance and sophistication
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <FontAwesomeIcon 
                icon={feature.icon} 
                className="text-3xl text-[#AF8E2F] mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              A Culinary Journey
            </h2>
            <p className="text-gray-600 mb-6">
              Our dining hall offers an exceptional culinary experience, with
              gourmet dishes crafted by world-class chefs. Whether you're enjoying
              a casual meal with family or celebrating a special occasion, the
              dining hall provides a perfect ambiance.
            </p>

            <div className="bg-[#AF8E2F]/10 rounded-xl p-8 mb-8">
              <h3 className="text-2xl font-semibold text-[#AF8E2F] mb-4">
                Highlights
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                  Elegant and modern interior design
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                  Varied international menu
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                  Private dining options available
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#AF8E2F] rounded-full mr-3" />
                  Perfect for large family gatherings
                </li>
              </ul>
            </div>

            <p className="text-gray-600 mb-8">
              Experience luxury with every bite in our beautifully decorated
              dining hall. We offer both buffet-style and à la carte dining to
              cater to your preferences. Whether you're here for a quick meal or
              a special celebration, we ensure the highest standards of service.
            </p>

            <div className="text-center">
              <button className="bg-[#AF8E2F] text-white px-8 py-3 rounded-full hover:bg-[#8B721F] transition-colors font-semibold">
                Make a Reservation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
