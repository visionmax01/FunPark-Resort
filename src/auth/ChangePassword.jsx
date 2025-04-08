import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSpinner, 
  faKey,
  faEye,
  faEyeSlash
} from '@fortawesome/free-solid-svg-icons';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState(''); // To store email from OTP response
  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Minimum 8 characters, at least one letter and one number
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  const validateStep1 = () => {
    if (!currentPassword) {
      toast.error('Current password is required');
      return false;
    }
    if (!newPassword) {
      toast.error('New password is required');
      return false;
    }
    if (!validatePassword(newPassword)) {
      toast.error('Password must be at least 8 characters with at least one letter and one number');
      return false;
    }
    if (!confirmPassword) {
      toast.error('Please confirm your new password');
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return false;
    }
    return true;
  };

  const requestOtp = async () => {
    if (!validateStep1()) return;

    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/request-password-change-otp', {
        currentPassword
      });
      setEmail(response.data.email); // Store email from response
      setStep(2);
      toast.success('OTP sent to your registered email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error requesting OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAndChangePassword = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.put('/api/change-password', {
        currentPassword,
        newPassword,
        otp
      });

      toast.success('Password changed successfully');
      navigate('/user-dashboard');
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error changing password. Please try again.');
      }
      
      // If OTP is invalid, go back to step 1
      if (error.response?.status === 400) {
        setStep(1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div className="w-full max-w-md h-fit rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-[#5b3016]">
            {step === 1 ? 'Change Password' : 'Verify OTP'}
          </h2>
          <p className="text-[#5b3016] mt-1">
            {step === 1 ? 'Secure your account' : `Enter code sent to ${email || 'your email'}`}
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6 text-[#5b3016]">
          {step === 1 ? (
            <div className="space-y-5">
              {/* Current Password */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-[#5b3016]">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-[#d4a373] rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none transition-all"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5b3016]"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    <FontAwesomeIcon icon={showCurrentPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-[#5b3016]">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength="8"
                      className="w-full px-4 py-2 border border-[#d4a373] rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none transition-all"
                      placeholder="New password (min 8 characters)"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5b3016]"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters with at least one letter and one number
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-[#5b3016]">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength="8"
                      className="w-full px-4 py-2 border border-[#d4a373] rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none transition-all"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5b3016]"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={requestOtp}
                disabled={isLoading}
                className={`w-full mt-4 py-3 px-4 rounded-lg font-medium text-white bg-[#5b3016] hover:bg-[#6d3a1c] transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faKey} className="mr-2" />
                    Request OTP
                  </>
                )}
              </button>
            </div>
          ) : (
            <form onSubmit={verifyAndChangePassword} className="space-y-5">
              {/* OTP Input */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-[#5b3016]">
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      // Only allow numbers and limit to 6 digits
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                    }}
                    required
                    maxLength="6"
                    inputMode="numeric"
                    pattern="\d{6}"
                    className="w-full px-4 py-2 border border-[#d4a373] rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none transition-all"
                    placeholder="Enter 6-digit OTP"
                  />
                  <FontAwesomeIcon 
                    icon={faKey} 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5b3016]" 
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Check your email for the 6-digit verification code
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-4 py-3 px-4 rounded-lg font-medium text-white bg-[#5b3016] hover:bg-[#6d3a1c] transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                    Changing Password...
                  </>
                ) : (
                  'Change Password'
                )}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mt-2 py-2 px-4 rounded-lg font-medium text-[#5b3016] hover:text-[#6d3a1c] transition-all duration-300"
              >
                Back to password form
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#f8f3e6] px-6 py-4 text-center">
          <p className="text-sm text-[#5b3016]">
            Having trouble? <a href="#" className="font-medium hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;