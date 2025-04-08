import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faUsers, faCalendarAlt, faClipboardCheck, 
  faCheckCircle, faSpinner, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import apiClient from "../../utils/api";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPendingBookings: 0,
    totalConfirmedBookings: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/status/dashboard-stats');
        setStats({
          ...response.data.stats,
          loading: false,
          error: null
        });
      } catch (error) {
        setStats(prev => ({
          ...prev,
          loading: false,
          error: error.response?.data?.message || 'Failed to fetch stats'
        }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    { 
      title: "Total Users", 
      value: stats.totalUsers, 
      icon: faUsers,
      trend: "12% increase",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-100"
    },
    { 
      title: "Pending Bookings", 
      value: stats.totalPendingBookings, 
      icon: faClipboardCheck,
      trend: "3 new today",
      color: "from-amber-500 to-amber-600",
      textColor: "text-amber-100"
    },
    { 
      title: "Confirmed Bookings", 
      value: stats.totalConfirmedBookings, 
      icon: faCheckCircle,
      trend: "8% conversion",
      color: "from-emerald-500 to-emerald-600",
      textColor: "text-emerald-100"
    },
    { 
      title: "Total Bookings", 
      value: stats.totalPendingBookings + stats.totalConfirmedBookings, 
      icon: faCalendarAlt,
      trend: "24% monthly growth",
      color: "from-violet-500 to-violet-600",
      textColor: "text-violet-100"
    }
  ];

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="fa-spin text-4xl text-blue-500 mb-3" />
          <p className="text-lg font-medium text-gray-600">Loading dashboard statistics...</p>
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center p-6 bg-red-50 rounded-xl max-w-md">
          <div className="text-red-500 text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-medium text-red-600">Error Loading Data</h3>
          <p className="text-red-500 mt-2">{stats.error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.color} rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className={`${stat.textColor} font-medium opacity-90`}>{stat.title}</p>
                  <h3 className="text-3xl font-bold text-white mt-2">{stat.value.toLocaleString()}</h3>
                </div>
                <div className={`p-3 rounded-lg  bg-opacity-20`}>
                  <FontAwesomeIcon icon={stat.icon} className="text-2xl text-white" />
                </div>
              </div>
              <div className="mt-6">
                <p className="text-xs font-medium text-white opacity-80">{stat.trend}</p>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-1.5 mt-2">
                  <div 
                    className={`bg-white h-1.5 rounded-full`} 
                    style={{ width: `${Math.min(100, (stat.value / (stat.value + 10)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4 text-[#5b3016]">
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-blue-100 rounded-lg mr-4">
              <FontAwesomeIcon icon={faUserPlus} className="text-blue-500" />
            </div>
            <div>
              <p className="font-medium">5 new users registered</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="p-2 bg-emerald-100 rounded-lg mr-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-500" />
            </div>
            <div>
              <p className="font-medium">3 bookings confirmed</p>
              <p className="text-sm text-gray-500">Today, 10:45 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;