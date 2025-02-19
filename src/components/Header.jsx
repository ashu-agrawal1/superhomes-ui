import React, { useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/AuthSlice";
import blueTypo from "../assets/BLUETypo.png";
import icon from "../assets/ICON WHITE.png";
import logo from "../assets/BLUELogo.png";
export default function Header() {
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
    <header className="relative w-full px-4 py-3">
      <div className="max-w-7xl mx-auto grid grid-cols-3 items-center h-">
        {/* Left - Hamburger Menu */}
        <div className="relative z-20 flex justify-start items-center">
          <FaBars
            className="text-2xl md:text-3xl cursor-pointer text-gray-800 hover:opacity-80 transition-opacity"
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

        {/* Center - Logo */}
        <div className="flex justify-center items-center w-full h-sm md:h-48">
          <img src={blueTypo} alt="Logo" className="object-contain" />
        </div>

        {/* Right - User Section */}
        <div className="flex justify-end items-center gap-2 md:gap-4 z-20">
          {isAuthenticated && user && (
            <p className="text-sm md:text-base hidden sm:block truncate max-w-[150px] relative ">
              {user.name}
            </p>
          )}
          <FaUserCircle className="text-2xl md:text-3xl text-gray-800 cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
        <div className="w-full">
          <img
            src={logo}
            alt="logo"
            className="w-12 md:w-24 absolute left-1/2 translate-x-[-50%] bottom-0 md:right-[45rem] md:bottom-0 "
          />
        </div>
      </div>
    </header>
  );
}
