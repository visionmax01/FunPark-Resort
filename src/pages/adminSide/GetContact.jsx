import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowUp, 
  faArrowDown, 
  faTrash, 
  faEye,
  faCalendarAlt,
  faUser,
  faEnvelope,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const GetContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:7000/contactApi/getcontacts');
      setContacts(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
      setLoading(false);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:7000/contactApi/deletecontact/${id}`);
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        toast.error('Failed to delete contact');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Submissions</h1>
                <p className="text-gray-600 mt-1">View and manage all contact form submissions</p>
              </div>
             
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AF8E2F]"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('createdAt')}
                      >
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                          Date
                          {sortConfig.key === 'createdAt' && (
                            <FontAwesomeIcon 
                              icon={sortConfig.direction === 'asc' ? faArrowUp : faArrowDown} 
                              className="ml-1 text-xs"
                            />
                          )}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('firstName')}
                      >
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faUser} className="mr-2" />
                          Name
                          {sortConfig.key === 'firstName' && (
                            <FontAwesomeIcon 
                              icon={sortConfig.direction === 'asc' ? faArrowUp : faArrowDown} 
                              className="ml-1 text-xs"
                            />
                          )}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('email')}
                      >
                        <div className="flex items-center">
                          <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                          Email
                          {sortConfig.key === 'email' && (
                            <FontAwesomeIcon 
                              icon={sortConfig.direction === 'asc' ? faArrowUp : faArrowDown} 
                              className="ml-1 text-xs"
                            />
                          )}
                        </div>
                      </th>
                      <th 
                        scope="col" 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <FontAwesomeIcon icon={faPhone} className="mr-2" />
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedContacts.length > 0 ? (
                      sortedContacts.map((contact) => (
                        <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {formatDate(contact.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 bg-[#AF8E2F]/10 rounded-full flex items-center justify-center">
                                <FontAwesomeIcon icon={faUser} className="text-[#AF8E2F] w-5 h-5" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {contact.firstName} {contact.lastName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button
                                className="text-blue-600 hover:text-blue-900 p-2 rounded-full cursor-pointer hover:bg-blue-50 transition-colors"
                                title="View details"
                                onClick={() => {
                                  // You can implement a modal or separate view page here
                                  toast.info(
                                    <div>
                                      <p><strong>Message:</strong></p>
                                      <p className="mt-2">{contact.message}</p>
                                    </div>,
                                    {
                                      position: "top-center",
                                      autoClose: false,
                                      closeOnClick: false,
                                      draggable: false,
                                    }
                                  );
                                }}
                              >
                                <FontAwesomeIcon icon={faEye} className="h-5 w-5" />
                              </button>
                              <button
                                className="text-red-600 hover:text-red-900 p-2 rounded-full cursor-pointer hover:bg-red-50 transition-colors"
                                title="Delete"
                                onClick={() => handleDelete(contact._id)}
                              >
                                <FontAwesomeIcon icon={faTrash} className="h-5 w-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No contact submissions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GetContact;
