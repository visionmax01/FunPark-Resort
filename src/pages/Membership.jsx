import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCrown, 
  faCheck, 
  faGem, 
  faCalendar, 
  faCalendarAlt, 
  faInfinity, 
  faPhone, 
  faEnvelope,
  faQrcode,
  faUpload,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";
import membershipHeroImage from "../assets/img/2.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MembershipPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState(1); // 1: Select plan, 2: Payment, 3: Confirmation
  const [screenshot, setScreenshot] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const membershipPlans = [
    {
      title: "Monthly",
      icon: faCalendar,
      price: "₹ 2,999",
      period: "month",
      color: "from-blue-500 to-blue-600",
      features: [
        "Access to all resort facilities",
        "10% off on food & beverage",
        "Complimentary welcome drink",
        "Priority booking for activities",
        "Early check-in and late check-out"
      ]
    },
    {
      title: "Quarterly",
      icon: faCalendarAlt,
      price: "₹ 7,999",
      period: "quarter",
      color: "from-purple-500 to-purple-600",
      features: [
        "All Monthly benefits",
        "15% off on food & beverage",
        "One complimentary night stay",
        "10% discount on services",
        "Priority weekend reservations"
      ]
    },
    {
      title: "Yearly",
      icon: faCrown,
      price: "₹ 24,999",
      period: "year",
      color: "from-[#AF8E2F] to-yellow-600",
      isPopular: true,
      features: [
        "All Quarterly benefits",
        "20% off on food & beverage",
        "Two complimentary night stays",
        "Free room upgrades",
        "Exclusive member events"
      ]
    },
    {
      title: "Lifetime",
      icon: faInfinity,
      price: "₹ 99,999",
      period: "one-time",
      color: "from-red-500 to-red-600",
      features: [
        "All Yearly benefits",
        "Lifetime resort access",
        "Free event access",
        "25% lifetime F&B discount",
        "VIP treatment & upgrades"
      ]
    }
  ];

  const handleSelectPlan = (plan) => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please login to purchase a membership");
      navigate("/login", { state: { from: "/membership" } });
      return;
    }
    
    setSelectedPlan(plan);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setScreenshot(null);
    setTransactionId("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    setScreenshot(file);
  };

  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    
    if (!transactionId || !screenshot) {
      toast.error("Please provide transaction ID and payment screenshot");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("planType", selectedPlan.title.toLowerCase());
      formData.append("amount", selectedPlan.price.replace(/[^0-9]/g, ""));
      formData.append("transactionId", transactionId);
      formData.append("screenshot", screenshot);

      const response = await axios.post("/api/membership/purchase", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setStep(3);
      toast.success("Payment submitted successfully!");
    } catch (error) {
      console.error("Payment submission error:", error);
      toast.error(error.response?.data?.message || "Payment submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membershipPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden ${plan.isPopular ? 'ring-2 ring-[#AF8E2F]' : ''}`}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-[#AF8E2F] text-white text-sm py-1 px-3 rounded-bl-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`bg-gradient-to-r ${plan.color} p-6 text-white`}>
                  <FontAwesomeIcon icon={plan.icon} className="text-3xl mb-4" />
                  <h2 className="text-2xl font-bold mb-1">{plan.title}</h2>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm ml-2">/ {plan.period}</span>
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <FontAwesomeIcon icon={faCheck} className="text-[#AF8E2F] mt-1 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => handleSelectPlan(plan)}
                    className="w-full mt-8 bg-[#AF8E2F] text-white py-3 rounded-lg hover:bg-[#8B721F] transition-colors font-semibold"
                  >
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Payment</h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Selected Plan: {selectedPlan.title}</h3>
              <p className="text-xl font-bold text-[#AF8E2F]">{selectedPlan.price} / {selectedPlan.period}</p>
            </div>

            <div className="mb-8 p-4 border border-gray-200 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FontAwesomeIcon icon={faQrcode} className="mr-2 text-[#AF8E2F]" />
                PhonePe Nepal Payment
              </h3>
              <div className="flex flex-col items-center">
                <img 
                  src="/phonepe-qr.png" 
                  alt="PhonePe QR Code" 
                  className="w-64 h-64 mb-4 border border-gray-300 p-2"
                />
                <p className="text-gray-600 mb-2">Scan this QR code to make payment</p>
                <p className="font-semibold">Amount: {selectedPlan.price}</p>
              </div>
            </div>

            <form onSubmit={handleSubmitPayment}>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Transaction ID</label>
                <input
                  type="text"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AF8E2F] focus:border-transparent"
                  required
                  placeholder="Enter PhonePe transaction ID"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Payment Screenshot</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FontAwesomeIcon icon={faUpload} className="text-[#AF8E2F] text-xl mb-2" />
                      <p className="mb-2 text-sm text-gray-500">
                        {screenshot ? screenshot.name : "Click to upload screenshot"}
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 bg-[#AF8E2F] text-white rounded-lg hover:bg-[#8B721F] ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : "Submit Payment"}
                </button>
              </div>
            </form>
          </div>
        );

      case 3:
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className="text-5xl text-green-500 mb-4" 
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Payment Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your {selectedPlan.title} membership payment has been received and is being verified. 
              You'll receive a confirmation email once your payment is approved.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">
                What's Next?
              </h3>
              <p className="text-sm text-gray-600">
                We'll verify your payment within 24 hours. Check your email for updates.
              </p>
            </div>

            <Link
              to="/membership"
              className="inline-block px-6 py-2 bg-[#AF8E2F] text-white rounded-lg hover:bg-[#8B721F]"
              onClick={() => {
                setStep(1);
                setSelectedPlan(null);
                setScreenshot(null);
                setTransactionId("");
              }}
            >
              Back to Membership
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative h-[35vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={membershipHeroImage} 
            alt="Membership Plans" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#AF8E2F]/90 to-black/50" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
          <nav className="text-sm mb-6">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-white/60">/</span>
            <span className="text-white">Membership</span>
          </nav>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Exclusive Membership Plans
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Join our exclusive membership program and unlock a world of luxury, privileges, and unforgettable experiences at Vartika Hotel Funpark & Resort.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {renderStep()}
      </div>

      {/* Contact Section (only shown in step 1) */}
      {step === 1 && (
        <div className="container mx-auto px-6 pb-16">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <FontAwesomeIcon icon={faGem} className="text-[#AF8E2F] text-4xl mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Join?
              </h3>
              <p className="text-gray-600">
                Contact our membership team for more details or to get started with your membership journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-center">
              <div className="p-4">
                <FontAwesomeIcon icon={faPhone} className="text-[#AF8E2F] text-2xl mb-3" />
                <p className="text-lg font-semibold text-gray-800">+977-9819931223</p>
                <p className="text-gray-600">Available 24/7</p>
              </div>
              <div className="p-4">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#AF8E2F] text-2xl mb-3" />
                <p className="text-lg font-semibold text-gray-800">contact@vartikahotel.com</p>
                <p className="text-gray-600">We reply within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipPage;