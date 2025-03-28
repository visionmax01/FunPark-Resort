import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserProfile = () => {
    const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return navigate('/login');

                const response = await axios.get('http://localhost:7000/api/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data.user);
                setIsLoading(false);
            } catch (error) {
                toast.error('Failed to fetch user data');
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:7000/api/update', user, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success('Profile updated successfully');
            // Check if user role is 1 (admin) or 0 (user) and redirect accordingly
            if (user && user.role === 1) {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }, []);
    
    
      // Handle My Account Click
      const handleAccountClick = () => {
        if (user?.role === 1) {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      };
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className=" px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-extrabold text-gray-900">Profile Settings</h2>
                    <p className="mt-2 text-lg text-gray-600">Update your personal information</p>
                </div>
                
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-6 sm:p-10">
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-[#5b3016] rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                        placeholder="John Doe"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3  text-[#5b3016] rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                        placeholder="john@example.com"
                                        disabled
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-[#5b3016] rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                        placeholder="+1 (555) 123-4567"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        id="address"
                                        value={user.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-[#5b3016] rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                                        placeholder="123 Main St, City"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-end space-x-4 pt-6">
                                <button
                                    onClick={handleAccountClick}
                                    className="px-6 py-3 cursor-pointer border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-6 py-3 cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>Need help? <a href="#" className="text-purple-600 hover:text-purple-800">Contact support</a></p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;