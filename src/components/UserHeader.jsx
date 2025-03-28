import React from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faCalendarAlt, faHome } from '@fortawesome/free-solid-svg-icons';

const UserHeader = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path === '/user-dashboard' && location.pathname.startsWith('/user-dashboard'));
  };

  if (!user) {
    return (
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>Loading user data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#5b3016] rounded-full flex items-center justify-center text-white text-xl">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#5b3016]">{user.name || 'User'}</h2>
              <p className="text-gray-600 text-sm">{user.email || ''}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <NavLink 
              to="/user-dashboard" 
              className={`flex items-center ${isActive('/user-dashboard') ? 'text-[#7c4019] font-medium border-b-2 border-[#7c4019]' : 'text-[#5b3016] hover:text-[#7c4019]'} pb-1`}
            >
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Dashboard
            </NavLink>
            <NavLink 
              to="/user-dashboard/my-bookings" 
              className={`flex items-center ${isActive('/user-dashboard/my-bookings') ? 'text-[#7c4019] font-medium border-b-2 border-[#7c4019]' : 'text-[#5b3016] hover:text-[#7c4019]'} pb-1`}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
              My Bookings
            </NavLink>
            <NavLink 
              to="/user-dashboard/profile" 
              className={`flex items-center ${isActive('/user-dashboard/profile') ? 'text-[#7c4019] font-medium border-b-2 border-[#7c4019]' : 'text-[#5b3016] hover:text-[#7c4019]'} pb-1`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </NavLink>
            <NavLink 
              to="/user-dashboard/change-password" 
              className={`flex items-center ${isActive('/user-dashboard/change-password') ? 'text-[#7c4019] font-medium border-b-2 border-[#7c4019]' : 'text-[#5b3016] hover:text-[#7c4019]'} pb-1`}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Change Password
            </NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;