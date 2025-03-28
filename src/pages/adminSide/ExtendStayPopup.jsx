import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiX, FiPlus, FiMinus } from "react-icons/fi";

const ExtendStayPopup = ({ booking, onClose, onSave }) => {
  const [daysToAdd, setDaysToAdd] = useState(1);
  const [newEndDate, setNewEndDate] = useState("");

  useEffect(() => {
    if (booking) {
      const originalDate = new Date(booking.date);
      const newDate = new Date(originalDate);
      newDate.setDate(originalDate.getDate() + daysToAdd);
      setNewEndDate(newDate.toISOString().split('T')[0]);
    }
  }, [daysToAdd, booking]);

  const handleSave = () => {
    onSave({
      ...booking,
      extendedStayDays: daysToAdd,
      newEndDate: newEndDate
    });
  };

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
        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800">Extend Stay</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Current Booking Date:</p>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="daysToAdd" className="block text-sm font-medium text-gray-700">
                Number of Days to Add:
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setDaysToAdd(Math.max(1, daysToAdd - 1))}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FiMinus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center font-medium">{daysToAdd}</span>
                <button
                  type="button"
                  onClick={() => setDaysToAdd(daysToAdd + 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">New End Date:</p>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="font-medium text-blue-800">
                  {new Date(newEndDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Confirm Extension
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExtendStayPopup;