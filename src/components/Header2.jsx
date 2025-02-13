import React, { useState } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/AuthSlice'; 
import '../css/font.css';
import logo from '../assets/ICON-GOLDEN.png';
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
    <div>
      <header className="flex  bg-gradient-to-r from-blue-700 to-blue-500 items-center justify-between p-10 relative">
        {/* Left Icons (FaBars) for all screen sizes */}
        <div className="flex items-center space-x-6">
          <FaBars 
            className="text-white text-4xl cursor-pointer z-50"
            onClick={toggleDropdown} 
          />
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-md shadow-lg py-2 w-48 z-50">
              <Link to="/" className="block px-4 py-2 text-center text-gray-700 hover:bg-gray-200 rounded-md">
                <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">Home</button>
              </Link>
              
              {/* Only show My Bookings when user is authenticated */}
              {isAuthenticated && (
                <Link to="/my-bookings" className="block px-4 py-2 text-center text-gray-700 hover:bg-gray-200 rounded-md">
                  <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">My Bookings</button>
                </Link>
              )}

              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="block px-4 py-2 text-center text-gray-700 hover:bg-gray-200 rounded-md">
                    <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">Login</button>
                  </Link>
                  <Link to="/register" className="block px-4 py-2 text-center text-gray-700 hover:bg-gray-200 rounded-md">
                    <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">Register</button>
                  </Link>
                </>
              ) : (
                <>
                  {/* Only show Dashboard link if user is an admin */}
                  {user && user.role === 'admin' && (
                    <Link to="/dashboard" className="block px-4 py-2 text-center text-gray-700 hover:bg-gray-200 rounded-md">
                      <button className="w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors">Dashboard</button>
                    </Link>
                  )}
                  <div className='hover:bg-gray-200 rounded-md'> 
                    <button 
                      onClick={handleLogout}
                      className="block w-full bg-[#014BC8] text-white py-2 rounded-md hover:bg-[#0A7CE7] transition-colors mt-2 w-[160px] flex items-center justify-center mx-auto"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
    
       {/* logo */}
       <img src={logo} alt='logo' className='w-32 mx-auto scale-150' />

        {/* Right Icons (FaUserCircle) */}
        <div className="flex items-center space-x-6 absolute right-6 sm:right-10 md:right-16 top-1/2 transform -translate-y-1/2">
          {isAuthenticated && user && (
            <p className="text-white text-3xl sm:text-base hidden sm:block">{`Welcome, ${user.name}!`}</p>
          )}
          <FaUserCircle className="text-white text-4xl cursor-pointer" />
        </div>
      </header>
    </div>
  );
}
