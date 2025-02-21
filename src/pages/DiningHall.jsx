// src/pages/DiningHall.js

import React from "react";
import diningImage from "../assets/img/1.jpg"; // Assuming you have an image in the assets folder

export default function DiningHall() {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto w-full flex  items-start">
        {/* Image Section (fixed on left) */}
        <div className="relative   w-full md:w-1/2 ">
          <img
            src={diningImage}
            alt="Dining Hall"
            className="h-auto w-full rounded-lg shadow-lg "
          />
        </div>

        {/* Content Section (scrollable) */}
        <div className="w-full md:w-3/4  ml-12 mr-24 space-y-6 text-lg text-gray-700 overflow-y-auto">
          <h1 className="text-4xl font-bold text-[#AF8E2F]">Dining Hall</h1>

          <p>
            Our dining hall offers an exceptional culinary experience, with
            gourmet dishes crafted by world-class chefs. Whether you're enjoying
            a casual meal with family or celebrating a special occasion, the
            dining hall provides a perfect ambiance.
          </p>

          <p>
            <span className="font-semibold">Highlights:</span>
            <ul className="list-disc ml-6 mt-2">
              <li>Elegant and modern interior design</li>
              <li>Varied international menu</li>
              <li>Private dining options available</li>
              <li>Perfect for large family gatherings</li>
            </ul>
          </p>

          <p>
            Experience luxury with every bite in our beautifully decorated
            dining hall. We offer both buffet-style and à la carte dining to
            cater to your preferences. Whether you're here for a quick meal or
            a special celebration, we ensure the highest standards of service.
          </p>

          <p>
            Our team is dedicated to making your dining experience memorable
            with outstanding service and attention to detail. Make your reservation
            today and indulge in a unique culinary journey.
          </p>
        </div>
      </div>
    </div>
  );
}
