import React from "react";
import { motion } from "framer-motion";
import { FiX, FiUser, FiCalendar, FiPhone, FiClock } from "react-icons/fi";

// Helper function to format time in AM/PM
const formatTimeAMPM = (timeString) => {
  if (!timeString) return "";
  
  const [hours, minutes] = timeString.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

const ViewBookingPopup = ({ booking, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-xl shadow-2xl w-1/2  max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Booking Details</h3>
              <p className="text-sm text-gray-500 mt-1">ID: {booking._id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 cursor-pointer hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-red-900">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FiUser className="text-blue-600" />
                <h4 className="font-medium text-blue-800">Customer Information</h4>
              </div>
              <div className="space-y-2 pl-7">
                <p>
                  <span className="text-sm text-gray-600">Name:</span> 
                  <span className="ml-2 font-medium">{booking.name}</span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Email:</span> 
                  <span className="ml-2 font-medium">{booking.email || "Not provided"}</span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Phone:</span> 
                  <span className="ml-2 font-medium">{booking.phoneNumber}</span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Guests:</span> 
                  <span className="ml-2 font-medium">{booking.numPeople || "Not specified"}</span>
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <FiCalendar className="text-green-600" />
                <h4 className="font-medium text-green-800">Booking Information</h4>
              </div>
              <div className="space-y-2 pl-7">
                <p>
                  <span className="text-sm text-gray-600">Date:</span> 
                  <span className="ml-2 font-medium">
                    {new Date(booking.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Time:</span> 
                  <span className="ml-2 font-medium">
                    {formatTimeAMPM(booking.time)}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Extended Stay:</span> 
                  <span className="ml-2">
                    {booking.extendedStayDays ? (
                      <span className="text-green-600">
                        {booking.extendedStayDays} days
                      </span>
                    ) : (
                      "Not extended"
                    )}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Booking For:</span> 
                  <span className="ml-2 font-medium">
                    {booking.bookingFor}
                  </span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Status:</span> 
                  <span className="ml-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.bookingStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.bookingStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1)}
                    </span>
                  </span>
                </p>
                <p>
                  <span className="text-sm text-gray-600">Created:</span> 
                  <span className="ml-2 font-medium">
                    {new Date(booking.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
          
          {booking.notes && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <h4 className="font-medium text-gray-800">Special Requests</h4>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{booking.notes}</p>
              </div>
            </div>
          )}
          
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewBookingPopup;