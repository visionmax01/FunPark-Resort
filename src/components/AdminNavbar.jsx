import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/img/main-logoo.jpg';

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: '' });
  const [unseenCount, setUnseenCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch user data
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:7000/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUserData(response.data.user);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

      // Fetch unseen contacts count
      fetchUnseenContacts();
      
      // Set up polling for new contacts (every 30 seconds)
      const interval = setInterval(fetchUnseenContacts, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const fetchUnseenContacts = () => {
    axios.get('http://localhost:7000/contactApi/unseen', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      setUnseenCount(response.data.count);
      setNotifications(response.data.contacts);
    })
    .catch(error => {
      console.error('Error fetching unseen contacts:', error);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (unseenCount > 0) {
      // Mark notifications as seen
      axios.put('http://localhost:7000/contactApi/mark-seen', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(() => {
        setUnseenCount(0);
      })
      .catch(error => {
        console.error('Error marking notifications as seen:', error);
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 left-0 px-4 py-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 hover:bg-gray-100 p-2 rounded-lg md:hidden"
          >
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="FunPark Resort" 
              className="h-12 w-auto hidden md:block"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="text-gray-700 cursor-pointer hover:bg-gray-100 p-2 rounded-lg relative"
            >
              <FontAwesomeIcon icon={faBell} className="text-xl" />
              {unseenCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                  {unseenCount}
                </span>
              )}
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-30">
                <div className="py-1">
                  <div className="px-4 py-2 bg-gray-100 border-b">
                    <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                  </div>
                  {notifications.length > 0 ? (
                    notifications.map(contact => (
                      <div 
                        key={contact._id} 
                        className="px-4 py-3 border-b hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/admin/contacts`)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              New contact from {contact.firstName} {contact.lastName}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {contact.subject}
                            </p>
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatDate(contact.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-sm text-gray-500">
                      No new notifications
                    </div>
                  )}
                  <div 
                    className="px-4 py-2 text-center text-sm font-medium text-[#AF8E2F] hover:bg-gray-50 cursor-pointer border-t"
                    onClick={() => {
                      navigate(`/admin-dashboard/contacts`);
                      setShowNotifications(false);
                    }}
                  >
                    View all contacts
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-2 border-gray-300 rounded-md pr-2">
            <p className="font-bold bg-[#553119] px-2 py-1 rounded-l-sm "> 
              <FontAwesomeIcon icon={faUser} className="mr-1" /> Welcome
            </p> 
            <p className="text-gray-700 uppercase font-bold">{userData.name || 'Admin'}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex text-red-600 items-center gap-2 hover:border-2 p-1 border-2 rounded-md border-gray-300 text-sm hover:border-red-600 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span className="hidden sm:inline cursor-pointer">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;