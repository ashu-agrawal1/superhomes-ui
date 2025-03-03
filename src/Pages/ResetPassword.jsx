"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../Redux/AuthSlice";
import { Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const resultAction = await dispatch(
      resetPassword({
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.newPassword,
      })
    );
    if (!resultAction.error) {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <HeaderLogin />
      <div className="max-w-4xl mx-auto p-8 bg-[#EDEDED] my-4">
        <h2 className="text-center text-5xl font-bold text-[#292929] mb-6">
          Reset Password
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error.message || JSON.stringify(error)}
          </p>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium">
              EMAIL*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-md"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="otp" className="block font-medium">
              OTP*
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-md"
              placeholder="Enter OTP received in email"
              value={formData.otp}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label htmlFor="newPassword" className="block font-medium">
              NEW PASSWORD*
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              required
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-md pr-10"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 top-6 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium">
              CONFIRM PASSWORD*
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-md"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0044C1] text-white font-medium py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
