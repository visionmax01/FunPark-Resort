// src/components/BookingModal.js

import React, { useState } from "react";

export default function BookingModal({ isOpen, onClose }) {
  const [bookingType, setBookingType] = useState("room");
  const [numPeople, setNumPeople] = useState(1);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookingFor, setBookingFor] = useState("business");
  const [otherBookingFor, setOtherBookingFor] = useState(""); // New state for "Other" booking type

  if (!isOpen) return null;

  const handleClose = () => {
    onClose(); // Close modal when clicking outside
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submit logic here (e.g., send data to API or update state)
    alert("Booking Submitted");
    onClose(); // Close the modal after submission
  };

  return (
    <div
      className="fixed top-0  left-0 w-full h-full bg-black/65 z-50 flex flex-col items-center justify-center"
      onClick={handleClose}
    >
     <div className="relative w-1/2">
     <h2 className="text-2xl font-bold text-center w-fit mx-auto bg-white px-8 rounded-t-2xl text-[#AF8E2F]">Booking Details</h2>
     <button
              type="button"
              onClick={handleClose}
              className="border absolute right-0  z-50 bottom-1 border-gray-300 px-2  rounded bg-white hover:bg-gray-600 cursor-pointer"
            >
              x
            </button>
     </div>
      <div
        className="bg-white h-[85%] relative overflow-auto p-6 rounded shadow-lg w-1/2"
        onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to outer div
      >
       
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="block text-sm font-semibold">Booking Type</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingType"
                  value="room"
                  checked={bookingType === "room"}
                  onChange={(e) => setBookingType(e.target.value)}
                />
                <span className="ml-2">Room</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingType"
                  value="table"
                  checked={bookingType === "table"}
                  onChange={(e) => setBookingType(e.target.value)}
                />
                <span className="ml-2">Table</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingType"
                  value="ticket"
                  checked={bookingType === "ticket"}
                  onChange={(e) => setBookingType(e.target.value)}
                />
                <span className="ml-2">Ticket for FunPark</span>
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              placeholder="Enter your name"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Number of People</label>
            <input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              min="1"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Booking for</label>
            <div className="flex space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  value="business"
                  checked={bookingFor === "business"}
                  onChange={(e) => setBookingFor(e.target.value)}
                />
                <span className="ml-2">Business</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  value="family"
                  checked={bookingFor === "family"}
                  onChange={(e) => setBookingFor(e.target.value)}
                />
                <span className="ml-2">Family</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="bookingFor"
                  value="other"
                  checked={bookingFor === "other"}
                  onChange={(e) => setBookingFor(e.target.value)}
                />
                <span className="ml-2">Other</span>
              </label>
            </div>

            {/* Show 'Other' input field when booking type is 'Other' */}
            {bookingFor === "other" && (
              <div className="mt-2">
                <label className="block text-sm font-semibold">Specify Other</label>
                <input
                  type="text"
                  value={otherBookingFor}
                  onChange={(e) => setOtherBookingFor(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder="Enter booking type"
                />
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>

          <div className="mt-6 flex justify-between">
            
            <button
              type="submit"
              className="border border-[#AF8E2F] px-4 py-2 rounded hover:bg-[#AF8E2F] hover:text-white transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
