// src/pages/WeddingHall.js

import React from "react";
import weddingImage from "../assets/img/2.jpg"; // Assuming you have an image in the assets folder

export default function WeddingHall() {
  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="container mx-auto flex items-start">
        {/* Image Section (fixed on left) */}
        <div className="relative w-full md:w-1/3">
          <img
            src={weddingImage}
            alt="Wedding Hall"
            className="w-full h-auto rounded-lg shadow-lg "
          />
        </div>

        {/* Content Section (scrollable) */}
        <div className="w-full md:w-2/3 ml-12 mr-24 space-y-6 text-lg text-gray-700 overflow-y-auto">
          <h1 className="text-4xl font-bold text-[#AF8E2F]">Wedding Hall</h1>

          <p>
            Celebrate your special day in style at our luxurious Wedding Hall,
            designed to provide the perfect setting for your dream wedding. From
            the grand entrance to the final toast, every detail is crafted to
            ensure your day is unforgettable.
          </p>

          <p>
            <span className="font-semibold">Highlights:</span>
            <ul className="list-disc ml-6 mt-2">
              <li>Spacious and elegant venue</li>
              <li>Customizable decor and themes</li>
              <li>Experienced event planners</li>
              <li>State-of-the-art audio-visual equipment</li>
            </ul>
          </p>

          <p>
            Whether you're planning an intimate ceremony or a grand reception,
            our Wedding Hall provides the flexibility to accommodate any size
            and style of wedding. From floral arrangements to lighting, we take
            care of all the details so you can focus on enjoying your big day.
          </p>

          <p>
            Our team of professionals is dedicated to making your wedding day
            flawless. We offer a range of wedding packages that can be tailored
            to your specific needs, ensuring a unique and personalized experience.
          </p>

          <p>
            Book your wedding at our elegant Wedding Hall and make memories
            that will last a lifetime. Let us help you create a wedding that is
            as unique and beautiful as your love story.
          </p>
        </div>
      </div>
    </div>
  );
}
