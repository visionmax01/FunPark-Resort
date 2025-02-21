import { div } from "framer-motion/client";
import React from "react";

const MembershipPage = () => {
  return (
    <div className="bg-gray-100">
    <div className="max-w-7xl bg-white/10  rounded-md mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
        Vartika Hotel Funpark & Resort Membership Plans
      </h1>
      <p className="text-xl text-center text-gray-600 mb-10">
        Welcome to Vartika Hotel Funpark & Resort! Choose from our exclusive membership
        plans and enjoy special privileges and discounts.
      </p>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Monthly Membership Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Monthly Membership</h2>
          <p className="text-xl text-red-600 my-4">₹ XXXX / month</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Access to all resort facilities</li>
            <li>10% off on food & beverage</li>
            <li>Complimentary welcome drink</li>
            <li>Priority booking for activities and events</li>
            <li>Early check-in and late check-out</li>
          </ul>
        </div>

        {/* Quarterly Membership Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Quarterly Membership</h2>
          <p className="text-xl text-red-600 my-4">₹ XXXX / quarter</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>All benefits from Monthly Membership</li>
            <li>15% off on food & beverage</li>
            <li>One complimentary stay (1 night) per quarter</li>
            <li>10% discount on resort services</li>
            <li>Priority reservations for weekend bookings</li>
          </ul>
        </div>

        {/* Yearly Membership Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Yearly Membership</h2>
          <p className="text-xl text-red-600 my-4">₹ XXXX / year</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>All benefits from Quarterly Membership</li>
            <li>20% off on food & beverage</li>
            <li>Complimentary 2-night stay annually</li>
            <li>Free upgrade to superior room (subject to availability)</li>
            <li>Exclusive access to members-only events</li>
          </ul>
        </div>

        {/* Lifetime Membership Plan */}
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-gray-800">Lifetime Membership</h2>
          <p className="text-xl text-red-600 my-4">₹ XXXX (One-time Payment)</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>All benefits from Yearly Membership</li>
            <li>Lifetime access to all resort facilities</li>
            <li>Free access to all special events and concerts</li>
            <li>25% discount on food & beverage for life</li>
            <li>VIP treatment: Free upgrades, priority booking</li>
          </ul>
        </div>
      </div>

      <div className="bg-green-600 p-6 mt-12 rounded-lg text-white text-center">
        <h3 className="text-3xl font-bold mb-4">
          Join Us Now and Start Enjoying a World of Benefits!
        </h3>
        <p className="text-lg mb-4">For more details or to join, feel free to contact us:</p>
        <p className="text-xl">📞 +977-9819931223</p>
        <p className="text-xl">📧 contact@vartikahotel.com</p>
      </div>
    </div>
    </div>
  );
};

export default MembershipPage;
