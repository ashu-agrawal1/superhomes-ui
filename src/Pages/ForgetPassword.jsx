"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestPasswordReset } from "../Redux/AuthSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderLogin from "../components/HeaderLogin";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(requestPasswordReset(email));
    if (!resultAction.error) {
      navigate("/resetPassword");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* <Header /> */}
      <HeaderLogin/>
      <div className="max-w-4xl mx-auto p-8 bg-[#EDEDED] mt-4">
        <h2 className="text-center text-5xl font-bold text-[#292929] mb-6">
          Forgot Password
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
              type="email"
              required
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0044C1] text-white font-medium py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Instructions"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
