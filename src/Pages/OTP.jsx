'use client';

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { verifyOTP } from "../Redux/AuthSlice";
import { toast } from "react-hot-toast";
import { Loader2 } from 'lucide-react';

const OTPVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get email from location state
  const locationEmail = location.state?.email;

  // Set email if passed from location state
  if (locationEmail && !email) {
    setEmail(locationEmail);
  }

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (email) {
        const result = await dispatch(verifyOTP({ email, otp: otpValue }));

        if (result.type === "auth/verifyOTP/fulfilled") {
          
          navigate("/dashboard");
        }
      } else {
        toast.error("Email is missing. Please try registering again.");
      }
    } catch (error) {
      toast.error(error?.message || "OTP verification failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#292929]">Verify OTP</h2>
          <p className="text-gray-500">
            We've sent a verification code to{" "}
            <span className="font-medium text-[#292929]">
              {locationEmail || "your email"}
            </span>
          </p>
        </div>

        {!locationEmail && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                onChange={(e) => handleOtpChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="w-12 h-12 text-center text-xl font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Verifying...</span>
            </>
          ) : (
            "Verify OTP"
          )}
        </button>

        {error && (
          <p className="text-red-500 text-center text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}

        {/* <div className="text-center">
          <button
            onClick={() => {
              // Add resend OTP logic here
              toast.success("New OTP sent successfully!");
            }}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium focus:outline-none"
          >
            Didn't receive the code? Resend
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default OTPVerify;
