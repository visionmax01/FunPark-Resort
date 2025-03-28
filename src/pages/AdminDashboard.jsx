import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUsers, 
  faUser, 
  faChartBar,
  faHeadset,
} from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../components/AdminNavbar';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Determine active page based on current route
  const getActivePage = () => {
    const path = location.pathname;
    if (path.endsWith('/admin-dashboard') || path.endsWith('/admin-dashboard/')) return 'dashboard';
    if (path.includes('profile')) return 'profile';
    if (path.includes('users')) return 'users';
    if (path.includes('booking-requests')) return 'booking';
    if (path.includes('contacts')) return 'contacts';
    if (path.includes('change-password')) return 'change-password';
    return 'dashboard';
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        handleLogout={handleLogout}
        userData={userData}
      />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[5] md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-md text-gray-700 px-6 pt-24 fixed h-full transition-transform duration-300 ease-in-out z-10 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}> 
        <h1 className="text-2xl font-extrabold mb-8 uppercase text-center">Admin Panel</h1>
        <ul>
          <li className={`mb-2 ${getActivePage() === 'dashboard' && 'bg-[#553119] text-white rounded'}`}>
            <Link 
              to="/admin-dashboard"
              className="flex items-center text-lg cursor-pointer w-full hover:bg-gray-300 p-2 rounded transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" /> Dashboard
            </Link>
          </li>
          <li className={`mb-2 ${getActivePage() === 'users' && 'bg-[#553119] text-white rounded'}`}>
            <Link 
              to="/admin-dashboard/users"
              className="flex items-center text-lg w-full cursor-pointer hover:bg-gray-300 p-2 rounded transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faUsers} className="mr-2" /> Users
            </Link>
          </li>
          <li className={`mb-2 ${getActivePage() === 'profile' && 'bg-[#553119] text-white rounded'}`}>
            <Link 
              to="/admin-dashboard/profile"
              className="flex items-center text-lg w-full cursor-pointer hover:bg-gray-300 p-2 rounded transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
            </Link>
          </li>
          <li className={`mb-2 ${getActivePage() === 'booking' && 'bg-[#553119] text-white rounded'}`}>
            <Link 
              to="/admin-dashboard/booking-requests"
              className="flex items-center text-lg w-full cursor-pointer hover:bg-gray-300 p-2 rounded transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-2" /> Booking Requests
            </Link>
          </li>
          <li className={`mb-2 ${getActivePage() === 'contacts' && 'bg-[#553119] text-white rounded'}`}>
            <Link 
              to="/admin-dashboard/contacts"
              className="flex items-center text-lg w-full cursor-pointer hover:bg-gray-300 p-2 rounded transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faHeadset} className="mr-2" /> Contacts
            </Link>
          </li>
          <li className={`mb-2 ${getActivePage() === 'change-password' && 'bg-[#553119] text-white rounded'}`}>
            <Link 
              to="/admin-dashboard/change-password"
              className="flex items-center text-lg w-full cursor-pointer hover:bg-gray-300 p-2 rounded transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" /> Change Password
            </Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-64'} pt-16`}>
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;