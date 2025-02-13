import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserReservations } from '../Redux/PaymentSlice'
import { Calendar, MapPin, Users, CreditCard, CheckCircle, XCircle, Star, Clock, Building, ArrowRight } from 'lucide-react'

export default function MyBookings() {
  const dispatch = useDispatch()
  const { reservations, loading } = useSelector((state) => state.payment)
  const userId = useSelector((state) => state.auth.user?.user_id)

  useEffect(() => {
    if (userId) {
      dispatch(getUserReservations(userId))
    }
  }, [dispatch, userId])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!Array.isArray(reservations) || reservations.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">My Bookings</h1>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <p className="text-gray-600">No bookings found</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">My Bookings</h1>
        
        <div className="space-y-6">
          {reservations.map((booking) => (
            <div 
              key={booking.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        {booking.property_id ? `Luxury Stay #${booking.property_id}` : 'Booking Details'}
                      </h2>
                      <p className="text-sm text-gray-500">Booking ID: #{booking.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {/* <span className={`px-4 py-1.5 rounded-full text-sm font-medium
                      ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'}`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span> */}
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Dates Section */}
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center text-blue-700 mb-3">
                      <Calendar className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold">Stay Duration</h3>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Check-in:</span>
                        <span className="font-medium">{booking.start_date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Check-out:</span>
                        <span className="font-medium">{booking.end_date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Guest & Location Section */}
                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex items-center text-purple-700 mb-3">
                      <Users className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold">Guest Details</h3>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Guests:</span>
                        <span className="font-medium">{booking.guest} {booking.guest === 1 ? 'Person' : 'People'}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Property:</span>
                        <span className="font-medium">#{booking.property_id}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center text-green-700 mb-3">
                      <CreditCard className="h-5 w-5 mr-2" />
                      <h3 className="font-semibold">Payment Details</h3>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Amount:</span>
                        <span className="font-bold text-lg">₹{booking.total_price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        {/* <div className="flex items-center">
                          {booking.payment_status === 'success' ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          <span className="font-medium capitalize">{booking.payment_status}</span>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Section */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Booked on {booking.created_at}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        <span>Via {booking.payment_method}</span>
                      </div>
                    </div>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                      <span className="mr-1">View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  {booking.transaction_id && (
                    <p className="mt-2 text-xs text-gray-400">
                      Transaction ID: {booking.transaction_id}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

