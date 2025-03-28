import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserHome = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:7000/api/user', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data.user);
            } catch (error) {
                toast.error('Error fetching user data');
                console.error('Error fetching user data:', error);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    if (!user) {
        return <div className="flex justify-center items-center h-64">Loading user data...</div>;
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-6">Profile Information</h3>
            <div className="grid grid-cols-1 text-[#5b3016] md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="text-gray-500 mr-3 w-5" />
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="font-medium">{user.name}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-500 mr-3 w-5" />
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="text-gray-500 mr-3 w-5" />
                        <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium">{user.phone || 'Not provided'}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500 mr-3 w-5" />
                        <div>
                            <p className="text-sm text-gray-500">Address</p>
                            <p className="font-medium">{user.address || 'Not provided'}</p>
                        </div>
                    </div>
                </div>
            </div>
            <button
                onClick={() => navigate('/user-dashboard/profile')}
                className="mt-6 bg-[#5b3016] hover:bg-[#7c4019] text-white px-4 py-2 rounded-lg"
            >
                Edit Profile
            </button>
        </div>
    );
};

export default UserHome;