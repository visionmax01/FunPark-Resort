import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
// Import any social icons from Font Awesome brands if needed
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Background / Header Section (optional) */}
      <div
        className="w-full h-32 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513519107127-1b466b8c78ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gray-400 bg-opacity-40"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <h1 className="text-3xl font-bold">Contact Us</h1>
        </div>
      </div>

      {/* Contact Info + Form Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 w-[80%] mx-auto lg:grid-cols-2 gap-8">
          {/* Left Column: Contact Info */}
          <div className="bg-white rounded  p-6 flex flex-col justify-center">
            <h2 className="text-xl font-bold mb-4">Got any Questions?</h2>
            <p className="text-gray-600 mb-6">Get In Touch</p>

            {/* Phone */}
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faPhone} className="text-[#AF8E2F] w-6 h-6 mr-3" />
              <div>
                <p className="text-gray-800 font-semibold">+1 234 567 890</p>
                <p className="text-gray-500 text-sm">Mon-Fri 9am-5pm</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#AF8E2F] w-6 h-6 mr-3" />
              <div>
                <p className="text-gray-800 font-semibold">info@hotel.com</p>
                <p className="text-gray-500 text-sm">We reply within 24 hrs</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#AF8E2F] w-6 h-6 mr-3" />
              <div>
                <p className="text-gray-800 font-semibold">1234 Hotel Vartika.</p>
                <p className="text-gray-500 text-sm">Nepal, Biratnagar</p>
              </div>
            </div>

            {/* Opening */}
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faClock} className="text-[#AF8E2F] w-6 h-6 mr-3" />
              <div>
                <p className="text-gray-800 font-semibold">Opening Hours</p>
                <p className="text-gray-500 text-sm">24 Hours Open</p>
              </div>
            </div>

            {/* Social Media */}
            <p className="mt-4 text-gray-600 font-semibold">Our Social Media</p>
            <div className="flex items-center space-x-4 mt-2">
              <a
                href="#facebook"
                className="text-[#AF8E2F] hover:text-gray-700"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="#twitter"
                className="text-[#AF8E2F] hover:text-gray-700"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a
                href="#instagram"
                className="text-[#AF8E2F] hover:text-gray-700"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="#linkedin"
                className="text-[#AF8E2F] hover:text-gray-700"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-xl text-black font-bold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#AF8E2F]"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#AF8E2F]"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-[#AF8E2F]"
                  placeholder="Your Phone Number"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1" htmlFor="message">
                  Question / Comments
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded px-3 py-2 h-24 focus:outline-none focus:ring focus:ring-[#AF8E2F]"
                  placeholder="Your Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#AF8E2F] text-white px-4 py-2 rounded hover:bg-[#936f22] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1">
        {/* Example of a static image or an embedded map. Replace with your own. */}
        <iframe
          title="Map"
          className="w-full h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3496855732136!2d85.32230067560447!3d27.706190430588998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fd7773fd5d%3A0x991d7d3e96b02806!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2snp!4v168xxxxxxx!5m2!1sen!2snp"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
