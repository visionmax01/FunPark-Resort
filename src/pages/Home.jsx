import React from "react";
import { Link } from "react-router-dom";
import HeroSlideshow from "../components/HeroSlideshow";
import img1 from '../assets/img/1.jpg'
import img2 from '../assets/img/2.jpg'
import img3 from '../assets/img/3.jpg'
export default function Home() {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
     <HeroSlideshow/>

      {/* Highlights / Features Section */}
      <section className="py-12 px-4 md:px-12 lg:px-24 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#AF8E2F] uppercase mb-8">
          Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
            <img
              src={img1}
              alt="Dining"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Fine Dining</h3>
            <p className="text-gray-600">
              Indulge in exquisite cuisines from around the world, prepared by our master chefs.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
            <img
              src={img2}
              alt="Spa & Wellness"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Spa & Wellness</h3>
            <p className="text-gray-600">
              Relax and rejuvenate with our luxurious spa treatments and wellness programs.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-xl transition-shadow">
            <img
              src={img3}
              alt="Grand Suites"
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Grand Suites</h3>
            <p className="text-gray-600">
              Experience the pinnacle of luxury in our spacious suites, offering panoramic views.
            </p>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-12 px-4 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#AF8E2F] uppercase mb-8">
          Our Rooms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Room 1 */}
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1593032465176-c2b2cb51e86b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Deluxe Room"
              className="w-full md:w-1/2 h-48 object-cover"
            />
            <div className="p-4 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-2">Deluxe Room</h3>
              <p className="text-gray-600 mb-4">
                A perfect blend of comfort and luxury for your short stay.
              </p>
              <Link
                to="/rooms/deluxe"
                className="inline-block bg-[#AF8E2F] text-white px-4 py-2 rounded hover:bg-[#936f22] transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>

          {/* Room 2 */}
          <div className="flex flex-col md:flex-row bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1596224510504-923e7c04ac17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Executive Suite"
              className="w-full md:w-1/2 h-48 object-cover"
            />
            <div className="p-4 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-2">Executive Suite</h3>
              <p className="text-gray-600 mb-4">
                Enjoy top-tier amenities and spacious living areas for a perfect getaway.
              </p>
              <Link
                to="/rooms/executive"
                className="inline-block bg-[#AF8E2F] text-white px-4 py-2 rounded hover:bg-[#936f22] transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#AF8E2F] text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
        <p className="max-w-2xl mx-auto mb-6">
          Book your stay directly with us and enjoy exclusive discounts and privileges.
        </p>
        <Link
          to="/offers"
          className="bg-white text-[#AF8E2F] px-6 py-2 rounded font-semibold hover:bg-gray-100 transition-colors"
        >
          View Offers
        </Link>
      </section>
    </div>
  );
}
