import React, { useEffect, useState } from "react";
import { FiX, FiEdit2, FiEye, FiPhone, FiCheck, FiCalendar, FiUser, FiPlus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import ViewBookingPopup from "./ViewBookingPopup";
import EditBookingPopup from "./EditBookingPopup";
import ConfirmPopup from "./ConfirmPopup";
import ExtendStayPopup from "./ExtendStayPopup";

// Status badge component
const StatusBadge = ({ status }) => {
  let bgColor = "bg-gray-200";
  let textColor = "text-gray-800";
  
  if (status === "confirmed") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (status === "pending") {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-800";
  } else if (status === "cancelled") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const BookingRequests = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showExtendStayPopup, setShowExtendStayPopup] = useState(false);
  const [bookingToConfirm, setBookingToConfirm] = useState(null);
  const [bookingToExtend, setBookingToExtend] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Get auth token
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Fetch bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = getAuthToken();
        if (!token) {
          throw new Error('Authentication required. Please login.');
        }

        const res = await fetch("http://localhost:7000/bookApi/bookings", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error('Session expired. Please login again.');
          }
          throw new Error('Failed to fetch bookings');
        }

        const data = await res.json();
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          throw new Error('Invalid data format received');
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Filter bookings based on status
  const filteredBookings = bookings.filter(booking => {
    if (statusFilter === "all") return true;
    return booking.bookingStatus === statusFilter;
  });

  // Handle confirm booking
  const handleConfirmBooking = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`http://localhost:7000/bookApi/bookings/${bookingToConfirm._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ bookingStatus: "confirmed" }),
      });

      const result = await response.json();
      if (response.ok) {
        setBookings((prev) =>
          prev.map((booking) => 
            booking._id === bookingToConfirm._id 
              ? { ...booking, bookingStatus: "confirmed" } 
              : booking
          )
        );
        setShowConfirmPopup(false);
      } else {
        throw new Error(result.message || "Confirmation failed");
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      setError(error.message);
    }
  };

  // Handle extend stay
  const handleExtendStay = async (extendedData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`http://localhost:7000/bookApi/bookings/${extendedData._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date: extendedData.newEndDate,
          extendedStayDays: extendedData.extendedStayDays
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setBookings((prev) =>
          prev.map((booking) => 
            booking._id === extendedData._id 
              ? { 
                  ...booking, 
                  date: extendedData.newEndDate,
                  extendedStayDays: extendedData.extendedStayDays
                } 
              : booking
          )
        );
        setShowExtendStayPopup(false);
      } else {
        throw new Error(result.message || "Failed to extend stay");
      }
    } catch (error) {
      console.error("Error extending stay:", error);
      setError(error.message);
    }
  };

  // Open view popup
  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowViewPopup(true);
  };

  // Open edit popup
  const handleEdit = (booking) => {
    setEditFormData(booking);
    setShowEditPopup(true);
  };

  // Open confirm popup
  const handleConfirm = (booking) => {
    setBookingToConfirm(booking);
    setShowConfirmPopup(true);
  };

  // Open extend stay popup
  const handleExtend = (booking) => {
    setBookingToExtend(booking);
    setShowExtendStayPopup(true);
  };

  // Handle input change in edit form
  const handleChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  // Submit edit form
  const handleEditSubmit = async (updatedBooking) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`http://localhost:7000/bookApi/bookings/${updatedBooking._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedBooking),
      });

      const result = await response.json();
      if (response.ok) {
        setBookings((prev) =>
          prev.map((booking) => (booking._id === updatedBooking._id ? updatedBooking : booking))
        );
        setShowEditPopup(false);
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating booking:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Booking Requests</h1>
                <p className="text-gray-600 mt-1">Manage and review all booking requests</p>
              </div>
              
              <div className="mt-4 md:mt-0">
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full md:w-48 text-black rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded flex items-start">
                <FiX className="mt-1 mr-2 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone Number
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBookings.length > 0 ? (
                      filteredBookings.map((booking) => (
                        <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <FiUser className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{booking.name}</div>
                                <div className="text-sm text-gray-500">{booking.email || "No email provided"}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FiCalendar className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" />
                              <div className="text-sm text-gray-900">
                                {new Date(booking.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                                {booking.extendedStayDays && (
                                  <span className="ml-1 text-xs text-blue-600">
                                    (+{booking.extendedStayDays} days)
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-900 ml-2">
                                {booking.time}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                                <FiPhone className="h-4 w-4 text-green-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{booking.phoneNumber}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={booking.bookingStatus} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleView(booking)}
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-full cursor-pointer hover:bg-blue-50 transition-colors"
                                title="View details"
                              >
                                <FiEye className="h-5 w-5" />
                              </button>
                              <button
                                onClick={() => handleEdit(booking)}
                                className="text-yellow-600 hover:text-yellow-900 p-2 rounded-full cursor-pointer hover:bg-yellow-50 transition-colors"
                                title="Edit booking"
                              >
                                <FiEdit2 className="h-5 w-5" />
                              </button>
                              {booking.bookingStatus !== "confirmed" && (
                                <button
                                  onClick={() => handleConfirm(booking)}
                                  className="text-green-600 hover:text-green-900 p-2 rounded-full cursor-pointer hover:bg-green-50 transition-colors"
                                  title="Confirm booking"
                                >
                                  <FiCheck className="h-5 w-5" />
                                </button>
                              )}
                              <button
                                onClick={() => handleExtend(booking)}
                                className="text-purple-600 hover:text-purple-900 p-2 rounded-full cursor-pointer hover:bg-purple-50 transition-colors"
                                title="Extend stay"
                              >
                                <FiPlus className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          {error ? error : "No bookings found"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Popup */}
      <AnimatePresence>
        {showViewPopup && selectedBooking && (
          <ViewBookingPopup 
            booking={selectedBooking} 
            onClose={() => setShowViewPopup(false)}
            onExtendStay={() => {
              setBookingToExtend(selectedBooking);
              setShowExtendStayPopup(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Popup */}
      <AnimatePresence>
        {showEditPopup && (
          <EditBookingPopup
            booking={editFormData}
            onClose={() => setShowEditPopup(false)}
            onSave={handleEditSubmit}
          />
        )}
      </AnimatePresence>

      {/* Confirm Popup */}
      <AnimatePresence>
        {showConfirmPopup && (
          <ConfirmPopup
            message="Are you sure you want to confirm this booking?"
            onConfirm={handleConfirmBooking}
            onCancel={() => setShowConfirmPopup(false)}
          />
        )}
      </AnimatePresence>

      {/* Extend Stay Popup */}
      <AnimatePresence>
        {showExtendStayPopup && bookingToExtend && (
          <ExtendStayPopup
            booking={bookingToExtend}
            onClose={() => setShowExtendStayPopup(false)}
            onSave={handleExtendStay}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingRequests;