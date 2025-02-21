import React from "react";
import { Link } from "react-router-dom";

// Example images (use your own local or external images)
import room1 from "../assets/img/1.jpg";
import room2 from "../assets/img/2.jpg";
import room3 from "../assets/img/3.jpg";

export default function Rooms() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Breadcrumb and Title */}
      <div className="bg-gray-400 shadow p-4 mb-6">
        <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">Rooms</h1>
          
          <nav className="text-sm  text-gray-600 mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2"> &gt; </span>
            <span>Rooms</span>
          </nav>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 w-3/4 mx-auto gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded shadow overflow-hidden">
            <img
              src={room1}
              alt="Deluxe Triple Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Deluxe Triple Room
              </h2>
              <p className="text-sm text-gray-500">
                3 Beds | Nice View
              </p>
              <div className="mt-4">
                <button className="bg-[#AF8E2F] text-white px-4 py-2 rounded hover:bg-[#936f22] transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded shadow overflow-hidden">
            <img
              src={room2}
              alt="Standard Double Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Standard Double Room
              </h2>
              <p className="text-sm text-gray-500">
                2 Beds | Normal View
              </p>
              <div className="mt-4">
                <button className="bg-[#AF8E2F] text-white px-4 py-2 rounded hover:bg-[#936f22] transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded shadow overflow-hidden">
            <img
              src={room3}
              alt="Premium Suite Room"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Premium Suite Room
              </h2>
              <p className="text-sm text-gray-500">
                2 Beds | Normal View
              </p>
              <div className="mt-4">
                <button className="bg-[#AF8E2F] text-white px-4 py-2 rounded hover:bg-[#936f22] transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
