import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from './auth/Login';
import ForgotPassword from "./auth/ForgotPassword";
import Register from "./auth/Register";
import DiningHall from "./pages/DiningHall";
import WeddingHall from "./pages/WeddingHall";
import MembershipPage from "./pages/Membership";
import Rooms from "./pages/Rooms";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/userSide/UserDashboard";
import UserProfile from "./pages/UserProfile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersPage from './pages/adminSide/UsersPage';
import BookingRequests from './pages/adminSide/BookingRequests';
import GetContact from './pages/adminSide/GetContact';
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardStats from './pages/adminSide/DashboardStats';
import ChangePassword from './auth/ChangePassword';
import './App.css'

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin-dashboard');
  const isUserRoute = location.pathname.startsWith('/user-dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Show main navbar only for public routes */}
      {!isAdminRoute && <Navbar />}



      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/wedding-hall" element={<WeddingHall />} />
          <Route path="/dining-hall" element={<DiningHall />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />

          {/* Protected User Routes - Nested */}
          <Route
            path="/user-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={[0]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes - Nested */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={[1]}>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardStats />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="booking-requests" element={<BookingRequests />} />
            <Route path="contacts" element={<GetContact />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </main>

      {/* Show footer only for public routes */}
      {!isAdminRoute && !isUserRoute && <Footer />}
      <ToastContainer
  position="top-right"
  autoClose={2000}
/>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}