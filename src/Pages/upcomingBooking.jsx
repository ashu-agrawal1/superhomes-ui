import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllReservations } from "../Redux/PaymentSlice";
import { fetchPropertyById } from "../Redux/propertySlice";
import { format, parse, isToday, isAfter, differenceInDays } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import HeaderDashboard from "../components/HeaderDashboard";
const UpcomingBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allReservations, loading, error } = useSelector(
    (state) => state.payment
  );
  const [propertyDetails, setPropertyDetails] = useState({});

  useEffect(() => {
    dispatch(getAllReservations());
  }, [dispatch]);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const details = {};

      if (Array.isArray(allReservations)) {
        for (const reservation of allReservations) {
          try {
            const result = await dispatch(
              fetchPropertyById(reservation.property_id)
            ).unwrap();
            details[reservation.property_id] = {
              image: result.images?.[0]?.url || "/placeholder.svg",
              title: result.title || "Property Title Not Available",
            };
          } catch (error) {
            console.error(
              `Error fetching property ${reservation.property_id}:`,
              error
            );
          }
        }
      }

      setPropertyDetails(details);
    };

    if (allReservations && allReservations.length > 0) {
      fetchPropertyDetails();
    }
  }, [allReservations, dispatch]);

  const upcomingBookings = Array.isArray(allReservations)
    ? allReservations.filter((reservation) => {
        try {
          const startDate = parse(
            reservation.start_date,
            "MMM d, yyyy",
            new Date()
          );
          return isAfter(startDate, new Date()) || isToday(startDate);
        } catch (error) {
          console.error("Date parsing error:", error);
          return false;
        }
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderDashboard />

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Upcoming Bookings ({upcomingBookings.length})
            </h2>
            <div className="text-sm text-gray-600">
              {format(new Date(), "EEEE, MMMM d, yyyy")}
            </div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBookings.map((booking) => {
                const checkInDate = parse(
                  booking.start_date,
                  "MMM d, yyyy",
                  new Date()
                );
                const checkOutDate = parse(
                  booking.end_date,
                  "MMM d, yyyy",
                  new Date()
                );
                const dayCount = differenceInDays(checkOutDate, checkInDate);

                return (
                  <div
                    key={booking.reservation_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
                  >
                    <div className="relative h-48">
                      <img
                        src={
                          propertyDetails[booking.property_id]?.image ||
                          "/placeholder.svg"
                        }
                        alt={
                          propertyDetails[booking.property_id]?.title ||
                          "Property"
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-4">
                        {propertyDetails[booking.property_id]?.title ||
                          "Property Title"}
                      </h3>
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <div className="text-sm text-gray-600">Guest</div>
                          <div className="text-xl font-bold">
                            {booking.user_name || "Test User"}
                          </div>

                          <div className="text-sm text-gray-600 mt-4">
                            Check-in
                          </div>
                          <div className="text-xl font-bold">
                            {booking.start_date || "Feb 8, 2025"}
                          </div>

                          <div className="text-sm text-gray-600 mt-4">
                            Check-out
                          </div>
                          <div className="text-xl font-bold">
                            {booking.end_date || "Feb 9, 2025"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">AMT Paid</div>
                          <div className="text-xl font-bold">
                            ₹{booking.total_price?.toLocaleString()}
                          </div>

                          <div className="text-sm text-gray-600 mt-4">Days</div>
                          <div className="text-xl font-bold">{dayCount}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="bg-blue-500 text-white font-semibold p-4 m-4 rounded hover:bg-blue-600"
                      onClick={() => navigate("/calendar")}
                    >
                      View More
                    </button>
                  </div>
                );
              })}

              {upcomingBookings.length === 0 && (
                <div className="col-span-full bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-lg font-medium text-[#292929] mb-1">
                    No Upcoming Bookings
                  </h3>
                  <p className="text-gray-500">
                    There are no bookings scheduled for the upcoming days.
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

export default UpcomingBookings;
