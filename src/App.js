// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import SRT from "./Pages/SRT";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PropertyDetail from "./Pages/PropertyDetail"; // Placeholder for dynamic property page
import ViewMore from "./Pages/ViewMore";
import SingleProperty from "./Pages/SingleProprty";
import Cart from "./Pages/Cart";
import OTP from "./Pages/OTP";
import CheckRazor from "./Pages/RazorCheck";
import FilterProperty from "./Pages/FilterProperty";
import UpcomingBookings from "./Pages/upcomingBooking";
import Calendar from "./Pages/Calender";
import TodayBookings from "./Pages/TodaysBooking";
import ListingPage from "./Pages/ListingPage";
import MyBookings from "./Pages/MyBookings";
import Carosal2 from "./components/Carosal2";
import ContactUs from "./Pages/ContactUs";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndCondition";
import ResetPassword from "./Pages/ResetPassword";
import ForgetPasword from "./Pages/ForgetPassword";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="srt" element={<SRT />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="viewMore" element={<ViewMore />} />
        <Route path="property/:id" element={<PropertyDetail />} />
        <Route
          path="/single-property/:propertyId"
          element={<SingleProperty />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/rp" element={<CheckRazor />} />
        <Route path="/filter" element={<FilterProperty />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/carosal2" element={<Carosal2 />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/forgetPassword" element={<ForgetPasword />} />

        {/* Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upcoming-bookings" element={<UpcomingBookings />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/todays-bookings" element={<TodayBookings />} />
        </Route>

        {/* Catch-All 404 Route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
