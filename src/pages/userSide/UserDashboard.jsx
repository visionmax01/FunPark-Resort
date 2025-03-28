import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserHeader from '../../components/UserHeader';
import UserHome from './UserHome';
import MyBookings from './MyBookings';
import UserProfile from '../UserProfile';
import ChangePassword from '../../auth/ChangePassword';

const UserDashboard = () => {
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
                localStorage.setItem('user', JSON.stringify(response.data.user));
            } catch (error) {
                toast.error('Error fetching user data');
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    if (!user) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Pass the user data to UserHeader */}
            <UserHeader user={user} />
            <div className="container mx-auto px-4 py-8">
                <Routes>
                    <Route path="/" element={<UserHome user={user} />} />
                    <Route path="/my-bookings" element={<MyBookings user={user} />} />
                    <Route path="/profile" element={<UserProfile user={user} />} />
                    <Route path="/change-password" element={<ChangePassword user={user} />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserDashboard;