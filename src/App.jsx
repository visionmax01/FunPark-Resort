import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/weeding-hall" element={<WeddingHall />} />
            <Route path="/dining-hall" element={<DiningHall />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}