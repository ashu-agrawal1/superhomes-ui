import React, { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import blueTypo from "../assets/BLUETypo.png";
import dashlogo from "../assets/dashlogo.png";
import icon from "../assets/ICON WHITE.png";
import logo from "../assets/BLUELogo.png";
export default function HeaderLogin() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <header className="relative w-full bg-[#EDEDED]">
        <div className="grid grid-cols-3">
          {/* Center - Logo */}
          <div className="col"></div>
          <div className="col m-auto">
            <img src={dashlogo} alt="Logo" className="object-contain h-56" />
          </div>

          {/* Right - User Section */}

          <div className="col flex justify-center items-center gap-2 md:gap-4 z-20 ml-24">
            {/* Left - Hamburger Menu */}
            <div className="relative z-20 flex justify-start items-center">
              <FaBars
                className="text-2xl md:text-3xl cursor-pointer text-[#0044C1] hover:opacity-80 transition-opacity"
                onClick={toggleDropdown}
              />

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 w-48 z-50">
                  <Link to="/" className="block px-4 py-2 hover:bg-gray-50">
                    <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">
                      Home
                    </button>
                  </Link>

                  {isAuthenticated && (
                    <Link
                      to="/my-bookings"
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">
                        My Bookings
                      </button>
                    </Link>
                  )}

                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">
                          Login
                        </button>
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-gray-50"
                      >
                        <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">
                          Register
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {user && user.role === "admin" && (
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 hover:bg-gray-50"
                        >
                          <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">
                            Dashboard
                          </button>
                        </Link>
                      )}
                      <div className="px-4 py-2 hover:bg-gray-50">
                        <button
                          onClick={handleLogout}
                          className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <FaUserCircle className="text-2xl md:text-3xl text-[#0044C1] cursor-pointer hover:opacity-80 transition-opacity" />
          </div>
        </div>
        {/* <div className="flex justify-center">
        <img src={logo} alt="logo" className="w-24" />
      </div> */}
      </header>
      {/* <nav className="bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div
            className={`flex flex-col md:flex-row justify-center py-2 text-xl`}
          >
            <Link to="/dashboard" className="hover:underline md:mx-8">
              List
            </Link>
            |
            <Link to="/upcoming-bookings" className="hover:underline md:mx-8">
              Upcoming Bookings
            </Link>
            |
            <Link to="/todays-bookings" className="hover:underline md:mx-8">
              Today's Bookings
            </Link>
            |
            <Link to="/calendar" className="hover:underline md:mx-8">
              Calendar
            </Link>
          </div>
        </div>
      </nav> */}
    </>
  );
}
