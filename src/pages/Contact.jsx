import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faPaperPlane,
  faComments,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import contactHeroImage from "../assets/img/still-valey-MK-2.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactFeatures = [
    "24/7 Customer Support",
    "Quick Response Time",
    "Professional Team",
    "Personalized Service"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post("http://localhost:7000/contactApi/contactme", formData);
      toast.success(response.data.message, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.message || 
                         error.response?.data?.error || 
                         "Failed to submit form. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative h-[35vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={contactHeroImage} 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#AF8E2F]/90 to-black/50" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <nav className="text-sm mb-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/60">/</span>
            <span className="text-white">Contact</span>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              We're here to help and answer any questions you might have
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="bg-[#AF8E2F]/10 p-2 rounded-full">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-[#AF8E2F] w-4 h-4" />
                </div>
                <span className="text-gray-800 font-medium">{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="w-fit mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Contact Info */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] p-8 text-white">
                <FontAwesomeIcon icon={faComments} className="text-4xl mb-4" />
                <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
                <p className="text-white/90">
                  Have questions about our services or need assistance? We're here to help!
                </p>
              </div>

              {/* Contact Details */}
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start group">
                      <div className="bg-[#AF8E2F]/10 p-3 rounded-full group-hover:bg-[#AF8E2F] transition-colors duration-300">
                        <FontAwesomeIcon 
                          icon={faPhone} 
                          className="text-[#AF8E2F] w-6 h-6 group-hover:text-white transition-colors duration-300" 
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                        <p className="text-gray-600">+977 9819931223</p>
                        <p className="text-sm text-gray-500">Mon-sunday 8am-12pm</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start group">
                      <div className="bg-[#AF8E2F]/10 p-3 rounded-full group-hover:bg-[#AF8E2F] transition-colors duration-300">
                        <FontAwesomeIcon 
                          icon={faEnvelope} 
                          className="text-[#AF8E2F] w-6 h-6 group-hover:text-white transition-colors duration-300" 
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">info@vartikaHotel.com</p>
                        <p className="text-sm text-gray-500">We reply within 2 hrs</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start group">
                      <div className="bg-[#AF8E2F]/10 p-3 rounded-full group-hover:bg-[#AF8E2F] transition-colors duration-300">
                        <FontAwesomeIcon 
                          icon={faMapMarkerAlt} 
                          className="text-[#AF8E2F] w-6 h-6 group-hover:text-white transition-colors duration-300" 
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Location</h3>
                        <p className="text-gray-600">1234 Hotel Vartika</p>
                        <p className="text-sm text-gray-500">Nepal, Biratnagar</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-start group">
                      <div className="bg-[#AF8E2F]/10 p-3 rounded-full group-hover:bg-[#AF8E2F] transition-colors duration-300">
                        <FontAwesomeIcon 
                          icon={faClock} 
                          className="text-[#AF8E2F] w-6 h-6 group-hover:text-white transition-colors duration-300" 
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Opening Hours</h3>
                        <p className="text-gray-600">24 Hours Open</p>
                        <p className="text-sm text-gray-500">Always at your service</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    {[
                      { icon: faFacebookF, label: "Facebook", color: "hover:bg-blue-600" },
                      { icon: faTwitter, label: "Twitter", color: "hover:bg-sky-500" },
                      { icon: faInstagram, label: "Instagram", color: "hover:bg-pink-600" },
                      { icon: faLinkedinIn, label: "LinkedIn", color: "hover:bg-blue-700" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={`#${social.label.toLowerCase()}`}
                        className={`bg-[#AF8E2F]/10 p-3 rounded-full ${social.color} group/icon transition-all duration-300 hover:scale-110`}
                        aria-label={social.label}
                      >
                        <FontAwesomeIcon 
                          icon={social.icon} 
                          className="w-5 h-5 text-[#AF8E2F] group-hover/icon:text-white transition-colors duration-300"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#AF8E2F] to-[#8B721F] p-8 text-white">
                <FontAwesomeIcon icon={faPaperPlane} className="text-4xl mb-4" />
                <h2 className="text-2xl font-bold mb-4">Send us a Message</h2>
                <p className="text-white/90">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 pt-6 pb-2 rounded-lg border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#AF8E2F] outline-none text-gray-900 focus:border-transparent peer`}
                      placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                      First Name
                    </label>
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>
                  <div className="relative group">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 pt-6 pb-2 rounded-lg border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#AF8E2F] outline-none text-gray-900 focus:border-transparent peer`}
                      placeholder=" "
                    />
                    <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                      Last Name
                    </label>
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 pt-6 pb-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#AF8E2F] outline-none text-gray-900 focus:border-transparent peer`}
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                    Email Address
                  </label>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 pt-6 pb-2 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#AF8E2F] outline-none text-gray-900 focus:border-transparent peer`}
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                    Subject
                  </label>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div className="relative group">
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 pt-6 pb-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-[#AF8E2F] outline-none text-gray-900 focus:border-transparent peer`}
                    placeholder=" "
                  ></textarea>
                  <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3">
                    Message
                  </label>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r cursor-pointer from-[#AF8E2F] to-[#8B721F] text-white py-4 rounded-lg hover:from-[#8B721F] outline-none text-gray-900 hover:to-[#AF8E2F] transition-all duration-300 font-semibold transform hover:scale-[1.02] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}