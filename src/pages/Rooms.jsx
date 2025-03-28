import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faUsers, faExpand, faMountain, faWifi, faCoffee, faParking, faCocktail } from "@fortawesome/free-solid-svg-icons";

import room1 from "../assets/img/1.jpg";
import room2 from "../assets/img/2.jpg";
import room3 from "../assets/img/3.jpg";

export default function Rooms() {
  const [hoveredRoom, setHoveredRoom] = useState(null);

  const rooms = [
    {
      id: 1,
      image: room1,
      name: "Deluxe Triple Room",
      description: "Spacious room with mountain view and modern amenities",
      price: "Rs. 1600",
      features: [
        { icon: faBed, text: "3 Queen Beds" },
        { icon: faUsers, text: "Up to 6 Guests" },
        { icon: faExpand, text: "45 m²" },
        { icon: faMountain, text: "Mountain View" }
      ],
      amenities: [faWifi, faCoffee, faParking, faCocktail]
    },
    {
      id: 2,
      image: room2,
      name: "Standard Double Room",
      description: "Comfortable room with essential amenities",
      price: "Rs. 1200",
      features: [
        { icon: faBed, text: "2 Queen Beds" },
        { icon: faUsers, text: "Up to 4 Guests" },
        { icon: faExpand, text: "35 m²" },
        { icon: faMountain, text: "City View" }
      ],
      amenities: [faWifi, faCoffee, faParking]
    },
    {
      id: 3,
      image: room3,
      name: "Premium Suite Room",
      description: "Luxury suite with panoramic views and premium services",
      price: "Rs. 2000",
      features: [
        { icon: faBed, text: "1 King Bed" },
        { icon: faUsers, text: "Up to 2 Guests" },
        { icon: faExpand, text: "55 m²" },
        { icon: faMountain, text: "Panoramic View" }
      ],
      amenities: [faWifi, faCoffee, faParking, faCocktail]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="bg-[#AF8E2F] text-white">
        <div className="container mx-auto px-6 py-16">
          <nav className="text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Rooms</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Luxurious Accommodations
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Experience comfort and elegance in our carefully designed rooms
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-[#AF8E2F] font-semibold">{room.price}</span>
                  <span className="text-gray-600 text-sm">/night</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {room.name}
                </h2>
                <p className="text-gray-600 mb-4">{room.description}</p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {room.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <FontAwesomeIcon
                        icon={feature.icon}
                        className="text-[#AF8E2F] mr-2"
                      />
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-4 mb-6">
                  {room.amenities.map((amenity, index) => (
                    <FontAwesomeIcon
                      key={index}
                      icon={amenity}
                      className="text-gray-400"
                      title="Available"
                    />
                  ))}
                </div>

                {/* Button */}
                <button className="w-full bg-[#AF8E2F] text-white py-3 rounded-lg hover:bg-[#8B721F] transition-colors font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
