import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../Redux/PaymentSlice";
import { fetchPropertyById } from "../Redux/propertySlice";
import { format, parse, isToday } from "date-fns";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import HeaderDashboard from "../components/HeaderDashboard";
const TodayBookings = () => {
  const dispatch = useDispatch();
  const { allReservations, loading, error } = useSelector(
    (state) => state.payment
  );

  const [propertyDetails, setPropertyDetails] = useState({});

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  // Fetch property details for each booking
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const details = {};

      for (const reservation of allReservations) {
        try {
          const result = await dispatch(
            fetchPropertyById(reservation.property_id)
          ).unwrap();
          details[reservation.property_id] = {
            image: result.images?.[0]?.url || "/placeholder-property.jpg",
            title: result.title || "Property Title Not Available",
            userName: reservation.user_name || "N/A",
            userEmail: reservation.user_email || "N/A",
            userPhone: reservation.user_phone_number || "N/A", // Updated to use user_phone_number
          };
        } catch (error) {
          console.error(
            `Error fetching property ${reservation.property_id}:`,
            error
          );
        }
      }

      setPropertyDetails(details);
    };

    if (allReservations.length > 0) {
      fetchPropertyDetails();
    }
  }, [allReservations, dispatch]);

  // Filter today's bookings
  const todayBookings = allReservations.filter((reservation) => {
    try {
      const startDate = parse(
        reservation.start_date,
        "MMM d, yyyy",
        new Date()
      );
      return isToday(startDate);
    } catch (error) {
      console.error("Date parsing error:", error);
      return false;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderDashboard />
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              Today's Check-ins ({todayBookings.length})
            </h2>
            <div className="text-sm text-gray-600">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-md animate-pulse"
                >
                  <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {todayBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/4 bg-gray-200">
                      <img
                        src={
                          propertyDetails[booking.property_id]?.image ||
                          "/placeholder-property.jpg"
                        }
                        alt={
                          propertyDetails[booking.property_id]?.title ||
                          "Property"
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-lg mb-1">
                            {propertyDetails[booking.property_id]?.title ||
                              "Property Title"}
                          </h3>
                          <p className="text-gray-600">
                            Booking ID: {booking.id}
                          </p>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              booking.payment_status === "checked_in"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.payment_status === "checked_in"
                              ? "Checked In"
                              : "Pending Check-in"}
                          </span>
                          <span className="text-sm text-gray-600">
                            Guest Count: {booking.guest || "N/A"}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Check-in:</span>
                          <p className="font-medium">{booking.start_date}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Check-out:</span>
                          <p className="font-medium">{booking.end_date}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Payment Method:</span>
                          <p className="font-medium">
                            {booking.payment_method}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Amount:</span>
                          <p className="font-medium">
                            ₹{booking.total_price.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Guest Name:</span>
                          <p className="font-medium">
                            {propertyDetails[booking.property_id]?.userName}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Guest Email:</span>
                          <p className="font-medium">
                            {propertyDetails[booking.property_id]?.userEmail}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Guest Phone:</span>
                          <p className="font-medium">
                            {booking.user_phone_number ||
                              propertyDetails[booking.property_id]?.userPhone ||
                              "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {todayBookings.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#292929] mb-1">
                    No Check-ins Today
                  </h3>
                  <p className="text-gray-500">
                    There are no bookings scheduled for today.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TodayBookings;
