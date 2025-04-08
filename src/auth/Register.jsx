import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faUser, faEnvelope, faLock, faVenusMars, faPhone, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import illustrator from '../assets/img/still-valey-MK-3.jpg';
import apiClient from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = (inputId) => {
    document.getElementById(inputId).focus();
  };

  const getLabelClassName = (value) => {
    return `absolute left-4 px-1 text-gray-500 transition-all duration-200 bg-white cursor-text ${
      value ? 'top-[-0.6rem] text-sm text-[#5b3016]' : 'top-3 peer-focus:top-[-0.6rem] peer-focus:text-sm peer-focus:text-[#5b3016] peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400'
    }`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    const userData = {
      name: formData.name,
      gender: formData.gender,
      dob: formData.dob,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      password: formData.password
    };

    try {
      const response = await apiClient.post('/api/register', userData);
      setMessage('Registration successful!');
      setError('');
      setFormData({
        name: '',
        gender: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.response ? error.response.data.error : 'An error occurred');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const calculatePasswordStrength = (password) => {
    if (password.length === 0) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f4ed] to-[#eee6db] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mx-auto">
        <div className="md:flex">
          <div className="hidden md:block md:w-1/2 bg-[#5b3016] p-8">
            <h2 className="text-white text-3xl font-bold mb-4">Welcome to Funpark Resort</h2>
            <p className="text-[#d4b798] text-lg">Create your account to access exclusive offers and manage bookings</p>
            <div className="mt-8">
              <img src={illustrator} alt="Resort Illustration" className="w-full h-[400px] object-cover rounded-lg" />
            </div>
          </div>

          <div className="md:w-1/2 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
              <p className="text-gray-600">Already have an account? {' '}
                <Link to="/login" className="text-[#5b3016] hover:text-[#6d3a1c] font-medium">
                  Sign In
                </Link>
              </p>
            </div>

            {message && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-lg">
                {message}
              </div>
            )}

            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="relative cursor-text" onClick={() => handleClick('name')}>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 text-gray-600"
                    placeholder=" "
                  />
                  <label className={getLabelClassName(formData.name)}>
                    Full Name
                  </label>
                  <FontAwesomeIcon icon={faUser} className="absolute right-4 top-4 text-gray-400" />
                </div>

                {/* Gender */}
                <div className="relative cursor-pointer" onClick={() => handleClick('gender')}>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 appearance-none cursor-pointer text-gray-600"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label className={getLabelClassName(formData.gender)}>
                    Gender
                  </label>
                  <FontAwesomeIcon icon={faVenusMars} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Date of Birth */}
                <div className="relative cursor-text" onClick={() => handleClick('dob')}>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 text-gray-600"
                    placeholder=" "
                  />
                  <label className={getLabelClassName(formData.dob)}>
                    Date of Birth
                  </label>
                </div>

                {/* Email */}
                <div className="relative cursor-text" onClick={() => handleClick('email')}>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 text-gray-600"
                    placeholder=" "
                  />
                  <label className={getLabelClassName(formData.email)}>
                    Email Address
                  </label>
                  <FontAwesomeIcon icon={faEnvelope} className="absolute right-4 top-4 text-gray-400" />
                </div>

                {/* Phone */}
                <div className="relative cursor-text" onClick={() => handleClick('phone')}>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 text-gray-600"
                    placeholder=" "
                    pattern="[0-9]{10}"
                  />
                  <label className={getLabelClassName(formData.phone)}>
                    Phone Number
                  </label>
                  <FontAwesomeIcon icon={faPhone} className="absolute right-4 top-4 text-gray-400" />
                </div>

                {/* Address */}
                <div className="relative cursor-text" onClick={() => handleClick('address')}>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 text-gray-600"
                    placeholder=" "
                  />
                  <label className={getLabelClassName(formData.address)}>
                    Full Address
                  </label>
                  <FontAwesomeIcon icon={faMapMarker} className="absolute right-4 top-4 text-gray-400" />
                </div>

                {/* Password */}
                <div className="relative cursor-text col-span-2" onClick={() => handleClick('password')}>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 text-gray-600"
                    placeholder=" "
                  />
                  <label className={getLabelClassName(formData.password)}>
                    Password
                  </label>
                  <FontAwesomeIcon icon={faLock} className="absolute right-4 top-4 text-gray-400" />
                  <div className="mt-2 flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className={`h-1 w-full rounded-full ${i < passwordStrength ? 'bg-[#5b3016]' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="relative cursor-text col-span-2" onClick={() => handleClick('confirmPassword')}>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5b3016] focus:border-[#5b3016] outline-none peer hover:border-[#5b3016]/50 transition-colors duration-200 text-gray-600"
                    placeholder=" "
                  />
                  <label className={getLabelClassName(formData.confirmPassword)}>
                    Confirm Password
                  </label>
                  <FontAwesomeIcon icon={faLock} className="absolute right-4 top-4 text-gray-400" />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-[#5b3016] hover:bg-[#6d3a1c] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-4">
                By creating an account, you agree to our{' '}
                <a href="#" className="text-[#5b3016] hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-[#5b3016] hover:underline">Privacy Policy</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;