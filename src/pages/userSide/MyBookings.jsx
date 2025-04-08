import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BookingModal from '../../components/BookingModal';
import { 
  faCalendarAlt,
  faUser,
  faEnvelope,
  faPhone,
  faMoneyBillWave,
  faClock,
  faInfoCircle,
  faArrowRight,
  faHotel,
  faUtensils,
  faHeart,
  faCreditCard,
  faCheckCircle,
  faTimesCircle,
  faHourglassHalf
} from '@fortawesome/free-solid-svg-icons';
import apiClient from '../../utils/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return false;
      }
      return true;
    };

    const fetchBookings = async () => {
      try {
        if (!checkAuth()) return;

        const response = await apiClient.get('/bookApi/my-bookings');

        const sortedBookings = response.data.map(booking => ({
          ...booking,
          bookingStatus: booking.bookingStatus || 'pending',
          bookingType: booking.type || 'room',
          payment: booking.payment || {
            status: 'pending',
            paymentMethod: 'not specified'
          }
        })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    
    // Convert time string to AM/PM format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getBookingIcon = (type) => {
    const bookingType = type?.toLowerCase() || 'room';
    switch(bookingType) {
      case 'room': return <FontAwesomeIcon icon={faHotel} className="mr-2" />;
      case 'dining': return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
      case 'wedding': return <FontAwesomeIcon icon={faHeart} className="mr-2" />;
      default: return <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />;
    }
  };

  const getStatusBadge = (status) => {
    const statusText = status?.toLowerCase() || 'pending';
    const statusClasses = {
      pending: 'bg-amber-100 text-amber-800',
      confirmed: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-rose-100 text-rose-800',
      completed: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[statusText] || 'bg-gray-100 text-gray-800'}`}>
        {statusText.charAt(0).toUpperCase() + statusText.slice(1)}
      </span>
    );
  };

  const getPaymentStatusIcon = (status) => {
    const paymentStatus = status?.toLowerCase() || 'pending';
    switch(paymentStatus) {
      case 'verified': 
      case 'completed': 
      case 'success': 
        return <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500 mr-1" />;
      case 'failed': 
      case 'rejected': 
        return <FontAwesomeIcon icon={faTimesCircle} className="text-rose-500 mr-1" />;
      case 'pending': 
        return <FontAwesomeIcon icon={faHourglassHalf} className="text-amber-500 mr-1" />;
      default: 
        return <FontAwesomeIcon icon={faHourglassHalf} className="text-gray-500 mr-1" />;
    }
  };

  const renderPaymentDetails = (payment) => {
    if (!payment) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-2">PAYMENT DETAILS</h3>
          <div className="text-gray-600">
            <FontAwesomeIcon icon={faHourglassHalf} className="text-amber-500 mr-2" />
            Payment information not available
          </div>
        </div>
      );
    }

    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-500 mb-2">PAYMENT DETAILS</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCreditCard} className="text-[#553119] mr-2" />
            <span className="font-medium">Method: </span>
            <span className="ml-1 capitalize">
              {payment.paymentMethod || 'Not specified'}
            </span>
          </div>
          
          <div className="flex items-center">
            {getPaymentStatusIcon(payment.status)}
            <span className="font-medium">Status: </span>
            <span className="ml-1 capitalize">{payment.status || 'N/A'}</span>
          </div>

          {payment.transactionId && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faInfoCircle} className="text-[#553119] mr-2" />
              <span className="font-medium">Transaction ID: </span>
              <span className="ml-1">{payment.transactionId}</span>
            </div>
          )}

          {payment.amount && (
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#553119] mr-2" />
              <span className="font-medium">Amount: </span>
              <span className="ml-1">Rs.{payment.amount.toFixed(2)}</span>
            </div>
          )}

          {payment.screenshot && (
            <div className="col-span-2">
              <p className="font-medium mb-1">Payment Screenshot:</p>
              <a 
                href={`http://localhost:7000/${payment.screenshot}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Screenshot
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const toggleModal = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#553119]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-[#553119] mb-4 md:mb-0">My Bookings</h1>
        <button 
          onClick={toggleModal}
          className="bg-[#553119] text-white px-6 py-2 rounded-lg hover:bg-[#3a2110] transition-colors flex items-center"
        >
          Make New Booking
          <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </button>
      </div>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto">
          <div className="bg-[#f8f4ed] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-[#553119] text-2xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h3>
          <p className="text-gray-600 mb-6">You haven't made any bookings with us yet.</p>
          <button 
            onClick={toggleModal}
            className="bg-[#553119] text-white px-6 py-2 rounded-lg hover:bg-[#3a2110] transition-colors"
          >
            Make Your First Booking
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-black">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="flex items-center mb-3 md:mb-0">
                    {getBookingIcon(booking.bookingType)}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 capitalize">
                        {booking.bookingType} Booking
                      </h2>
                      <p className="text-gray-500 text-sm">#{booking.bookingId || booking._id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Booking Status:</span>
                    {getStatusBadge(booking.bookingStatus)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">DATE & TIME</h3>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faCalendarAlt} className="text-[#553119] mr-2" />
                      <span className="font-medium">
                        {formatDate(booking.date)} 
                        {booking.dateextended && (
                          <span className="text-gray-500">
                            {' '}to {formatDate(booking.dateextended)}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center mt-2">
                      <FontAwesomeIcon icon={faClock} className="text-[#553119] mr-2" />
                      <span className="font-medium">{formatTime(booking.time)}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">BOOKING DETAILS</h3>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faUser} className="text-[#553119] mr-2" />
                      <span>{booking.numPeople || 1} {booking.numPeople > 1 ? 'People' : 'Person'}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="text-[#553119] mr-2" />
                      <span className='text-green-600 text-lg'>Rs.{booking.amount?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">CONTACT INFO</h3>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faUser} className="text-[#553119] mr-2" />
                      <span>{booking.name || 'Not specified'}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <FontAwesomeIcon icon={faPhone} className="text-[#553119] mr-2" />
                      <span>{booking.phoneNumber || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {renderPaymentDetails(booking.payment)}

                {booking.message && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start">
                      <FontAwesomeIcon icon={faInfoCircle} className="text-[#553119] mr-2 mt-1" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">SPECIAL REQUEST</h3>
                        <p className="text-gray-700">{booking.message}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <BookingModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default MyBookings;