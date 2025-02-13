import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservations } from '../Redux/PaymentSlice';
import {FaUser} from 'react-icons/fa'
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isToday, 
  isSameMonth, 
  parse, 
  isSameDay, 
  addMonths, 
  subMonths 
} from 'date-fns';
import { Link } from 'react-router-dom';
// import '../css/font2.css';
const Calendar = () => {
  const dispatch = useDispatch();
  const { allReservations, loading, error } = useSelector((state) => state.payment);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Dispatch the action to fetch all reservations
    dispatch(getAllReservations());
  }, [dispatch]);

  // Log the response from the API and Redux state after the data is fetched
  useEffect(() => {
    if (allReservations.length > 0) {
      console.log('All Reservations:', allReservations);  // Logs the fetched reservations
    }
    if (error) {
      console.log('Error fetching reservations:', error);  // Logs any errors
    }
  }, [allReservations, error]);  // Log whenever data or error changes

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getBookingsForDate = (date) => {
    return allReservations.filter((booking) => {
      try {
        const bookingDate = parse(booking.start_date, 'MMM d, yyyy', new Date());
        return isSameDay(bookingDate, date);
      } catch (error) {
        return false;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white font-bold text-2xl flex justify-between items-center">
           <FaUser/>
       <h1 className="text-center flex-1">Admin Dashboard</h1>
       <div className="flex items-center gap-4">
       <Link to="/" className="text-white font-semibold text-xl">
        Home
       </Link>
     
       </div>
     </header>

      {/* Navigation */}
      <nav className="bg-blue-700 text-white flex justify-around py-2">
        <Link to="/dashboard" className="hover:underline ">
          Dashboard 
        </Link>
        <Link to="/upcoming-bookings" className="hover:underline ">
          Upcoming Bookings 
        </Link>
        <Link to="/todays-bookings" className="hover:underline font-bold ">
          Today's Bookings 
        </Link>
        <Link to="/calendar" className="hover:underline">
          Calendar 
        </Link>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Calendar Header */}
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                    className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentDate(new Date())}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Today
                  </button>
                  <button
                    onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                    className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Body */}
            {loading ? (
              <div className="animate-pulse">
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {Array(35).fill(null).map((_, i) => (
                    <div key={i} className="h-32 bg-gray-100"></div>
                  ))}
                </div>
              </div>
            ) : error ? (
              <div className="p-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              </div>
            ) : (
              <>
                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="bg-gray-50 p-2 text-center font-medium text-gray-700">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                  {days.map((day) => {
                    const bookings = getBookingsForDate(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);

                    return (
                      <div
                        key={day.toString()}
                        className={`min-h-32 bg-white p-2 ${!isCurrentMonth ? 'bg-gray-50' : ''} ${isToday(day) ? 'bg-blue-50' : ''}`}
                      >
                        <p className={`text-sm sm:text-base ${!isCurrentMonth ? 'text-gray-400' : ''} ${isToday(day) ? 'font-bold text-blue-600' : ''}`}>
                          {format(day, 'd')}
                        </p>
                        <div className="mt-1 space-y-1">
                          {bookings.map((booking) => (
                            <div
                              key={booking.id}
                              className={`px-2 py-1 text-xs rounded ${booking.payment_status === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
                            >
                              <div className="font-medium truncate">
                                Booking #{booking.id} - Start: {booking.start_date}
                              </div>
                              <div className="text-xs opacity-75 truncate">
                                ₹{booking.total_price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-700 text-white text-center py-4 mt-auto">
        <p>© 2024 Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Calendar;
