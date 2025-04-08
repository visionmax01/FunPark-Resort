import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faStar, faTimes, faCalendar, faClock, faUsers, 
  faEnvelope, faPhone, faUser, faBuilding, 
  faHome, faTicket, faQrcode, faMoneyBillWave,
  faSpinner, faExclamationCircle, faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import  { toast } from "react-toastify";
import apiClient from "../utils/api";

const BookingModal = ({ isOpen, onClose }) => {
  // Form state
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState("room");
  const [numPeople, setNumPeople] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookingFor, setBookingFor] = useState("business");
  const [otherBookingFor, setOtherBookingFor] = useState("");
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [amount, setAmount] = useState(0);
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(false);

  // Calculate amount based on booking type
  useEffect(() => {
    const prices = { room: 5000, table: 1500, ticket: 800 };
    setAmount(prices[bookingType] * numPeople);
  }, [bookingType, numPeople]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setBookingType("room");
        setNumPeople(1);
        setName("");
        setEmail("");
        setPhoneNumber("");
        setDate("");
        setTime("");
        setBookingFor("business");
        setOtherBookingFor("");
        setPaymentMethod("");
        setTransactionId("");
        setScreenshot(null);
        setIsSubmitting(false);
        setError("");
        setSuccess(false);
      }, 300);
    }
  }, [isOpen]);

  // Fetch user data when modal opens
  useEffect(() => {
    const fetchUserData = async () => {
      const token = getAuthToken();
      if (!token) {
        setUser(null);
        return;
      }

      setIsLoadingUser(true);
      try {
        const response = await apiClient.get("/api/user");
        setUser(response.data.user);
        
        // Pre-fill form with user data
        setName(response.data.user.name || "");
        setEmail(response.data.user.email || "");
        setPhoneNumber(response.data.user.phone || "");
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUser(null);
        toast.error("Failed to load user profile. Please refresh the page.");
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  const getAuthToken = () => {
    const token = localStorage.getItem('token');
    return token;
  };

  const handleClose = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!name || !email || !phoneNumber || !date || !time) {
      setError("Please fill all required fields");
      return;
    }
    
    setStep(2);
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const token = getAuthToken();
    if (!token) {
      setIsSubmitting(false);
      toast.error('Please login to make a booking');
      return;
    }

    const bookingData = {
      bookingType,
      numPeople,
      name,
      email,
      phoneNumber,
      date,
      time,
      bookingFor: bookingFor === "other" ? otherBookingFor : bookingFor,
      amount,
      paymentMethod,
      message: ""
    };

    try {
      // Create booking
      const bookingResponse = await apiClient.post(
        "/bookApi/bookings",
        bookingData
      );

      // Handle QR payment verification
      if (paymentMethod === 'fonepay') {
        const formData = new FormData();
        formData.append('bookingId', bookingResponse.data.booking.bookingId);
        formData.append('transactionId', transactionId);
        if (screenshot) {
          formData.append('screenshot', screenshot);
        }

        await apiClient.post(
          "/bookApi/verify-payment",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
      }

      setSuccess(true);
      toast.success(
        paymentMethod === 'payLater' 
          ? "Booking successful! Please complete payment later." 
          : "Booking and payment successful!"
      );
      setTimeout(() => onClose(), 2000);
      
    } catch (err) {
      console.error("Booking error:", err);
      const errorMsg = err.response?.data?.message || err.message || "Booking failed";
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0]);
    }
  };

  const RequiredStar = () => (
    <FontAwesomeIcon icon={faStar} className="text-red-500 text-xs" />
  );

  const getBookingTypeIcon = (type) => {
    switch (type) {
      case 'room': return faHome;
      case 'table': return faBuilding;
      case 'ticket': return faTicket;
      default: return faHome;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl relative transform transition-all duration-300 max-h-[90vh] "
        onClick={handleModalClick}
      >
        <div className="md:flex">
          {/* Left Section - Branding */}
          <div className="md:w-5/12 bg-gradient-to-br from-[#5b3016] to-[#8B4513] p-8 rounded-l-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                {step === 1 ? "Make a Reservation" : "Complete Payment"}
              </h2>
              <p className="text-[#d4b798] text-lg leading-relaxed">
                {step === 1 
                  ? "Experience luxury and adventure at FunPark Resort. Book your perfect stay or thrilling activities today."
                  : "Secure your booking by completing the payment process."}
              </p>
              <div className="mt-8 space-y-4 text-[#d4b798]">
                <p className="flex items-center">
                  <FontAwesomeIcon icon={faHome} className="mr-3" />
                  Luxurious Rooms
                </p>
                <p className="flex items-center">
                  <FontAwesomeIcon icon={faBuilding} className="mr-3" />
                  Fine Dining
                </p>
                <p className="flex items-center">
                  <FontAwesomeIcon icon={faTicket} className="mr-3" />
                  Exciting Activities
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 opacity-10">
              <FontAwesomeIcon 
                icon={step === 1 ? getBookingTypeIcon(bookingType) : faQrcode} 
                className="text-white text-[200px]" 
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="md:w-7/12 p-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={handleClose}
              className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-gray-900 transition-colors p-2"
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>

            {success ? (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Successful!</h3>
                <p className="text-gray-600 text-center max-w-md">
                  {paymentMethod === 'payLater' 
                    ? "Your booking is confirmed. Please complete payment when you arrive."
                    : "Your booking and payment have been confirmed."}
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded flex items-start">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mt-1 mr-2 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {isLoadingUser ? (
                  <div className="mb-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 rounded flex items-center">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    <p>Loading user information...</p>
                  </div>
                ) : user ? (
                  <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded flex items-start">
                    <FontAwesomeIcon icon={faCheckCircle} className="mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Logged in as: {user.name}</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded flex items-start">
                    <FontAwesomeIcon icon={faExclamationCircle} className="mt-1 mr-2 flex-shrink-0" />
                    <p>Pleas Login to Continue Booking.</p>
                  </div>
                )}

                {step === 1 ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-6 ">
                    {/* Booking Type Selection */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        What would you like to book? <RequiredStar />
                      </h3>
                      <div className="grid grid-cols-3 gap-4  ">
                        {[
                          { type: 'room', label: 'Room', icon: faHome },
                          { type: 'table', label: 'Table', icon: faBuilding },
                          { type: 'ticket', label: 'FunPark', icon: faTicket }
                        ].map(({ type, label, icon }) => (
                          <label
                            key={type}
                            className={`flex flex-col items-center text-[#5b3016] justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              bookingType === type
                                ? "border-[#5b3016] bg-[#5b3016]/5 text-[#5b3016]"
                                : "border-gray-200 hover:border-[#5b3016]/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="bookingType"
                              value={type}
                              checked={bookingType === type}
                              onChange={(e) => setBookingType(e.target.value)}
                              className="hidden"
                              required
                            />
                            <FontAwesomeIcon icon={icon} className="text-2xl mb-2" />
                            <span className="text-sm font-medium">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 text-[#5b3016] md:grid-cols-2 gap-6">
                      <div className="relative group ">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name <RequiredStar />
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0  left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faUser} className="text-gray-400 group-focus-within:text-[#5b3016]" />
                          </div>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                            placeholder="Your Name"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <RequiredStar />
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 group-focus-within:text-[#5b3016]" />
                          </div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                            placeholder="youremail@gmail.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <RequiredStar />
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faPhone} className="text-gray-400 group-focus-within:text-[#5b3016]" />
                          </div>
                          <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                            placeholder="98XXXXXXXX"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Guests <RequiredStar />
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faUsers} className="text-gray-400 group-focus-within:text-[#5b3016]" />
                          </div>
                          <input
                            type="number"
                            value={numPeople}
                            onChange={(e) => setNumPeople(Math.max(1, parseInt(e.target.value) || 1))}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                            min="1"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Booking Date <RequiredStar />
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faCalendar} className="text-gray-400 group-focus-within:text-[#5b3016]" />
                          </div>
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in Time <RequiredStar />
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FontAwesomeIcon icon={faClock} className="text-gray-400 group-focus-within:text-[#5b3016]" />
                          </div>
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Booking Purpose */}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Purpose of Visit <RequiredStar />
                      </h3>
                      <div className="grid grid-cols-3  gap-4">
                        {["business", "family", "other"].map((type) => (
                          <label
                            key={type}
                            className={`flex items-center text-[#5b3016] justify-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              bookingFor === type
                                ? "border-[#5b3016] bg-[#5b3016]/5 text-[#5b3016]"
                                : "border-gray-200 hover:border-[#5b3016]/30"
                            }`}
                          >
                            <input
                              type="radio"
                              name="bookingFor"
                              value={type}
                              checked={bookingFor === type}
                              onChange={(e) => setBookingFor(e.target.value)}
                              className="hidden"
                              required
                            />
                            <span className="capitalize font-medium">{type}</span>
                          </label>
                        ))}
                      </div>

                      {bookingFor === "other" && (
                        <div className="mt-4">
                          <input
                            type="text"
                            value={otherBookingFor}
                            onChange={(e) => setOtherBookingFor(e.target.value)}
                            className="w-full px-4 text-[#5b3016] py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                            placeholder="Please specify your purpose"
                            required
                          />
                        </div>
                      )}
                    </div>

                    {/* Amount Display */}
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Estimated Amount:</span>
                        <span className="text-2xl font-bold text-[#5b3016]">
                          NPR {amount.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Next Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#5b3016] to-[#8B4513] text-white py-4 px-6 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-[0.99] active:scale-[0.97] shadow-lg"
                    >
                      Continue to Payment
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Options</h3>
                    <p className="text-gray-600 mb-6">
                      Total Amount: <span className="font-bold">NPR {amount.toLocaleString()}</span>
                    </p>

                    <div className="space-y-4">
                      {/* Pay Later Option */}
                      <label className="flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#5b3016]/50 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="payLater"
                          checked={paymentMethod === "payLater"}
                          onChange={() => setPaymentMethod("payLater")}
                          className="mt-1 mr-3"
                          required
                        />
                        <div>
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faMoneyBillWave} className="text-gray-600 mr-2" />
                            <h4 className="font-semibold">Pay Later</h4>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Complete payment when you arrive. Your booking will be confirmed immediately.
                          </p>
                        </div>
                      </label>

                      {/* QR Payment Option */}
                      <label className="flex items-start p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#5b3016]/50 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="fonepay"
                          checked={paymentMethod === "fonepay"}
                          onChange={() => setPaymentMethod("fonepay")}
                          className="mt-1 mr-3"
                          required
                        />
                        <div className="w-full">
                          <div className="flex items-center">
                            <FontAwesomeIcon icon={faQrcode} className="text-gray-600 mr-2" />
                            <h4 className="font-semibold">Pay with Fonepay QR</h4>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Scan the QR code and upload your payment confirmation.
                          </p>

                          {paymentMethod === "fonepay" && (
                            <div className="mt-4 space-y-4">
                              {/* QR Code Display */}
                              <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
                                <img 
                                  src="/fonepay-qr-sample.png" 
                                  alt="Fonepay QR Code" 
                                  className="w-48 h-48 mb-3 object-contain"
                                />
                                <p className="text-sm text-gray-600 text-center">
                                  Scan this QR code with your Fonepay app to complete payment
                                </p>
                              </div>

                              {/* Transaction ID */}
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Transaction ID <RequiredStar />
                                </label>
                                <input
                                  type="text"
                                  value={transactionId}
                                  onChange={(e) => setTransactionId(e.target.value)}
                                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#5b3016] focus:ring-0 outline-none transition-colors"
                                  placeholder="Enter transaction ID from Fonepay"
                                  required
                                />
                              </div>

                              {/* Screenshot Upload */}
                              <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                  Payment Screenshot <RequiredStar />
                                </label>
                                <div className="flex items-center justify-center w-full">
                                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                      {screenshot ? (
                                        <>
                                          <p className="text-sm text-green-600 mb-1">
                                            {screenshot.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            Click to change
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <FontAwesomeIcon icon={faQrcode} className="text-gray-400 mb-2" />
                                          <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            PNG, JPG (MAX. 2MB)
                                          </p>
                                        </>
                                      )}
                                    </div>
                                    <input 
                                      type="file" 
                                      className="hidden" 
                                      onChange={handleFileChange}
                                      accept="image/*"
                                      required={paymentMethod === "fonepay"}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                        disabled={isSubmitting}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-[#5b3016] to-[#8B4513] text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-70 flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          "Complete Booking"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;