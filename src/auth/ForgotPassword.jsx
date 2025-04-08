import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../utils/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faLock, 
  faKey, 
  faEdit,
  faArrowLeft,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Step 1: Request OTP
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/forgot-password', { email });
      setMessage(response.data.message);
      setIsError(false);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending OTP');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await apiClient.post('/api/verify-otp', { email, otp });
      setMessage(response.data.message);
      setIsError(false);
      setResetToken(response.data.resetToken);
      setUserId(response.data.userId);
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid OTP');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      return;
    }

    setIsLoading(true);
    try {
      await apiClient.post('/api/reset-password', {
        userId,
        resetToken,
        newPassword
      });
      setMessage('Password reset successfully! You can now login with your new password.');
      setIsError(false);
      setStep(4);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error resetting password');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to step 1 with current email
  const handleEditEmail = () => {
    setStep(1);
    setMessage('');
  };

  const renderStep = () => {
    switch (step) {
      case 1: // Request OTP
        return (
          <form onSubmit={handleRequestOTP} className="space-y-6">
            <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#5b3016] focus-within:border-[#5b3016]">
              <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                placeholder="Enter your email address"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-[#5b3016] text-white rounded-lg hover:bg-[#6d3a1c] transition-colors flex items-center justify-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        );

      case 2: // Verify OTP
        return (
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            {/* Email display with edit option */}
            <div className="bg-[#f8f3e6] p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#5b3016] mr-2" />
                <span className="text-sm text-[#5b3016]">
                  OTP sent to: <span className="font-medium">{email}</span>
                </span>
              </div>
              <button 
                type="button" 
                onClick={handleEditEmail}
                className="text-[#5b3016] hover:text-[#6d3a1c]"
                disabled={isLoading}
              >
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </div>

            <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#5b3016] focus-within:border-[#5b3016]">
              <FontAwesomeIcon icon={faKey} className="text-gray-400 mr-3" />
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="block w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-[#5b3016] text-white rounded-lg hover:bg-[#6d3a1c] transition-colors flex items-center justify-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>
        );

      case 3: // Reset Password
        return (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="text-[#5b3016] hover:text-[#6d3a1c] flex items-center"
                disabled={isLoading}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                Back
              </button>
            </div>

            <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#5b3016] focus-within:border-[#5b3016]">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="block w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                placeholder="New Password"
                disabled={isLoading}
              />
            </div>
            <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-[#5b3016] focus-within:border-[#5b3016]">
              <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-3" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="block w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500 sm:text-sm"
                placeholder="Confirm New Password"
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-[#5b3016] text-white rounded-lg hover:bg-[#6d3a1c] transition-colors flex items-center justify-center ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>
        );

      case 4: // Success
        return (
          <div className="text-center">
            <Link
              to="/login"
              className="text-[#5b3016] hover:text-[#6d3a1c] font-medium"
            >
              Back to Login
            </Link>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Reset Your Password' : 
             step === 2 ? 'Verify OTP' : 
             step === 3 ? 'Set New Password' : 'Password Reset Successful'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1 ? 'Enter your email to receive a verification code' : 
             step === 2 ? 'Enter the 6-digit code sent to your email' : 
             step === 3 ? 'Create a new password' : 'You can now login with your new password'}
          </p>
        </div>

        {message && (
          <div className={`${isError ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'} border-l-4 p-4`}>
            <p className={`text-sm ${isError ? 'text-red-700' : 'text-green-700'}`}>
              {message}
            </p>
          </div>
        )}

        {renderStep()}

        {step !== 4 && (
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link to="/login" className="font-medium text-[#5b3016] hover:text-[#6d3a1c]">
                Sign in here
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;