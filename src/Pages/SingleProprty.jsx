"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { FaStar, FaCheckCircle, FaUser, FaBed, FaBath } from "react-icons/fa"
import { MdClose } from "react-icons/md"
import { fetchPropertyById } from "../Redux/propertySlice"
import {
  fetchPropertyAvailabilityById,
  addPropertyAvailability,
  checkBookingConflicts,
} from "../Redux/CheckAvailibility"
import { createRazorpayOrder, updatePaymentStatus, validatePayment } from "../Redux/PaymentSlice"
import { StackedCarousel } from "../components/Carosal2"
import Testimonials2 from './Testimonials2'
import Spinner from "../components/Spinner"
import Header2 from "../components/Header2"
import toast from "react-hot-toast"
import logo from "../assets/ICON-GOLDEN.png"
import typo from "../assets/TYPO-GOLDEN.png"
import Footer from '../components/Footer2'
const calculateExtraGuestCharges = (guests, maxGuests, basePrice) => {
  if (guests <= maxGuests) return basePrice
  const extraGuests = guests - maxGuests
  const extraCharges = extraGuests * 500
  return basePrice + extraCharges
}

const shuffleArray = (array) => {
  if (!array) return []
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function SingleProperty() {
  const { propertyId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { property, loading, error } = useSelector((state) => state.property)
  const { availability, status } = useSelector((state) => state.propertyAvailability)

  const [showModal, setShowModal] = useState(false)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [unavailableDates, setUnavailableDates] = useState([])
  const [newAvailability, setNewAvailability] = useState({
    start_date: "",
    end_date: "",
  })
  const [numberOfGuests, setNumberOfGuests] = useState(2)

  const checkAvailability = async () => {
    if (!newAvailability.start_date || !newAvailability.end_date) {
      toast.error("Please select both check-in and check-out dates")
      return false
    }

    const selectedStartDate = new Date(newAvailability.start_date)
    const selectedEndDate = new Date(newAvailability.end_date)

    // Check if dates are in the past
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedStartDate < today) {
      toast.error("Check-in date cannot be in the past")
      return false
    }

    if (selectedEndDate < today) {
      toast.error("Check-out date cannot be in the past")
      return false
    }

    if (selectedEndDate <= selectedStartDate) {
      toast.error("Check-out date must be after check-in date")
      return false
    }

    try {
      const hasConflict = await dispatch(
        checkBookingConflicts({
          selectedStartDate,
          selectedEndDate,
          propertyId,
        }),
      ).unwrap()

      if (hasConflict) {
        toast.error("Selected dates are not available")
        return false
      }
      return true
    } catch (error) {
      console.error("Error checking availability:", error)
      toast.error("Error checking availability")
      return false
    }
  }

  const handleReserve = async () => {
    if (!user) {
      toast.error("Please login to make a reservation")
      navigate("/login")
      return
    }

    if (!newAvailability.start_date || !newAvailability.end_date || numberOfGuests <= 0) {
      toast.error("Please fill out all fields.")
      return
    }

    // Check availability before proceeding
    const isAvailable = await checkAvailability()
    if (!isAvailable) {
      return
    }

    try {
      const finalAmount = calculateExtraGuestCharges(numberOfGuests, property.max_guests, property.price * 1.15)

      const orderData = {
        amount: finalAmount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        user_id: user.user_id,
        property_id: propertyId,
        start_date: newAvailability.start_date,
        end_date: newAvailability.end_date,
        guest: numberOfGuests,
      }

      const order = await dispatch(createRazorpayOrder(orderData)).unwrap()
      if (!order || !order.id) {
        toast.error("Failed to create Razorpay order")
        return
      }

      const razorpayOptions = {
        key: "rzp_test_suGlReUubwbXnb",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Superhomess",
        description: `Payment for ${numberOfGuests} guest(s) at ${property?.name}`,
        image: property?.images[0]?.url || "/logo.png",
        handler: async (response) => {
          try {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: order.amount,
              currency: "INR",
              user_id: user.user_id,
              property_id: propertyId,
              start_date: newAvailability.start_date,
              end_date: newAvailability.end_date,
              guest: numberOfGuests,
            }

            const validationResponse = await dispatch(validatePayment(paymentData)).unwrap()

            if (validationResponse?.status === "success") {
              await dispatch(updatePaymentStatus({ status: "success" }))

              const reservationData = {
                property_id: propertyId,
                user_id: user.user_id,
                start_date: newAvailability.start_date,
                end_date: newAvailability.end_date,
                price: property.price,
                is_booked: 1,
                guest: numberOfGuests,
                payment_id: response.razorpay_payment_id,
              }
              await dispatch(addPropertyAvailability(reservationData))
            } else {
              console.log(validationResponse?.msg || "Payment validation failed.")
            }
          } catch (error) {
            console.error("Error during payment validation or saving reservation:", error)
            toast.error("There was an issue validating the payment or saving the reservation. Please contact support.")
          }
        },
        prefill: {
          name: user?.name || "Guest User",
          email: user?.email || "guest@example.com",
          contact: user?.phone_number || "",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const razorpay = new window.Razorpay(razorpayOptions)

      razorpay.on("payment.failed", (response) => {
        toast.error(`Payment failed: ${response.error.description}`)
        dispatch(
          updatePaymentStatus({
            status: "failed",
            error: response.error.description,
          }),
        )
      })

      razorpay.open()
    } catch (error) {
      console.error("Error during reservation process:", error)
      toast.error("Error creating payment order. Please try again.")
    }
  }

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchPropertyById(propertyId))
      dispatch(fetchPropertyAvailabilityById(propertyId))
    }
  }, [dispatch, propertyId])

  useEffect(() => {
    const loadRazorpayScript = () => {
      if (!document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        const script = document.createElement("script")
        script.src = "https://checkout.razorpay.com/v1/checkout.js"
        script.async = true
        script.onload = () => console.log("Razorpay script loaded")
        script.onerror = () => console.error("Failed to load Razorpay script")
        document.body.appendChild(script)
      }
    }
    loadRazorpayScript()
  }, [])

  if (loading) return <Spinner />
  if (error)
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600">
        Error fetching property: {error.message || error}
      </div>
    )
  if (!property) return <div className="container mx-auto px-4 py-8 text-center">Property not found</div>

  return (
    <>
      <div className="min-h-screen w-full flex flex-col bg-white">
        <Header2 />

        <main className="flex-1">
          <div className="w-full px-4 py-8 md:container md:mx-auto md:max-w-7xl">
            {/* carosal section */}
            <div className="mb-8 relative mt-6 p-6">
              <StackedCarousel images={property?.images?.map((img) => img.url) || []} />
            </div>
            {/* tile description  */}
            <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 mt-6 md:mt-10 gap-2">
  <h1 className="text-2xl md:text-3xl text-gray-800  font-bold">
    {property.title || "Earthen home in Mueang Chiang Mai District, Thailand"}
  </h1>
  <div className="flex items-center gap-2">
    <FaStar className="text-gray-700" />
    <span className="font-semibold">{property.rating || "4.3"}</span>
    <span className="text-gray-600">({property.reviewCount || "433"} reviews)</span>
  </div>
</div>


              <div className="flex flex-col md:flex-row justify-between items-start">
                <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-2 md:gap-4 text-base md:text-lg mb-4">
                  <span className="flex items-center gap-2 text-gray-800">
                    <FaUser className="text-gray-800" /> {property.max_guests || 1} guests
                  </span>
                  <span className="flex items-center gap-2 text-gray-800">
                    <FaBed className="text-gray-800" /> {property.bedrooms || 1} bedroom
                  </span>
                  {/* <span className="flex items-center gap-2">
                    <FaBed /> {property.beds || 2} beds
                  </span> */}
                  <span className="flex items-center gap-2 text-gray-800">
                    <FaBath className="text-gray-800"/> {property.bathrooms || 1} bathroom
                  </span>
                </div>
               
              </div>
            </div>
            <div>
              {/* payment card */}
              <div className="w-full max-w-8xl mx-auto bg-gray-200 rounded-2xl p-4 md:p-6 mt-5">
                <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-8">
                  {/* Host Section */}
                  <div className="flex flex-row lg:flex-col items-center justify-center gap-4 lg:gap-2">
                    <img
                      src={logo || "/placeholder.svg"}
                      alt="Host"
                      className="w-20 h-20 lg:w-28 lg:h-28 bg-white rounded-full "
                    />
                    <div className="text-left lg:text-center">
                      <h2 className="text-sm lg:text-[15px] font-medium">
                        Hosted by {property.host_name || "Superhomess"}
                      </h2>
                    </div>
                  </div>

                  {/* Dates and Guests Section */}
                  <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <div className="bg-gray-300 p-8 rounded-lg space-y-1">
                        <div className="text-sm font-medium">Check-in</div>
                        <input
                          type="date"
                          value={newAvailability.start_date}
                          onChange={(e) => setNewAvailability({ ...newAvailability, start_date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                          className="text-lg lg:text-2xl font-bold bg-transparent w-full"
                        />
                      </div>
                      <div className="bg-gray-300 p-8 rounded-lg space-y-1">
                        <div className="text-sm font-medium">Check-out</div>
                        <input
                          type="date"
                          value={newAvailability.end_date}
                          onChange={(e) => setNewAvailability({ ...newAvailability, end_date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                          className="text-lg lg:text-2xl font-bold bg-transparent w-full"
                        />
                      </div>
                    </div>
                    <div className="bg-gray-300 p-8 rounded-lg">
                      <div className="text-sm font-medium mb-1">Guests</div>
                      <input
                        type="number"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(Number.parseInt(e.target.value))}
                        min="1"
                        max={property.guests || 14}
                        className="text-lg lg:text-2xl font-bold bg-transparent w-full"
                      />
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="w-full lg:w-[200px]">
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm">Rent</span>
      <span className="font-medium">₹{property.price || 66799}</span>
    </div>
    <div className="flex justify-between items-center">
      <span className="text-sm">Platform Charge</span>
      <span className="font-medium">15%</span>
    </div>
    <div className="h-px bg-gray-300 my-2" />
    <div className="flex justify-between items-center">
      <span className="text-sm">Charge per night</span>
      <span className="font-medium">
        ₹{property.price || 66799}
      </span>
    </div>
    <div className="flex justify-between items-center text-base lg:text-lg font-bold">
      <span className="text-gray-800">TOTAL</span>
      <span className="text-gray-800">
        ₹{(() => {
          const basePrice = property.price || 0;
          const startDate = new Date(newAvailability.start_date);
          const endDate = new Date(newAvailability.end_date);
          const numberOfNights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)); // Calculate number of nights
          
          // Rent calculation for the stay
          const totalRent = basePrice * numberOfNights;
          
          // Apply platform charge only once (15% of the rent, not per night)
          const platformCharge = totalRent * 0.15;
          
          // Extra guest charges (if applicable)
          const extraGuestCharges =
            numberOfGuests > property.max_guests
              ? (numberOfGuests - property.max_guests) * 500 * numberOfNights // Extra charges for guests exceeding max allowed
              : 0;

          // Final total
          return (totalRent + platformCharge + extraGuestCharges).toFixed(2);
        })()}
      </span>
    </div>
    {numberOfGuests > property.max_guests && (
      <div className="text-sm text-green-500 mt-2">
        *Includes ₹{((numberOfGuests - property.max_guests) * 500 * Math.ceil((new Date(newAvailability.end_date) - new Date(newAvailability.start_date)) / (1000 * 60 * 60 * 24))).toFixed(2)} for{" "}
        {numberOfGuests - property.max_guests} extra guest(s)
      </div>
    )}
  </div>
</div>


                </div>

                <button
                  onClick={handleReserve}
                  className="w-full mt-6 bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  RESERVE NOW
                </button>
              </div>

              {/* what we offer section */}
              {/* <section>
                <h2 className="text-2xl md:text-3xl text-center font-bold mt-8 md:mt-12">
                  WHAT THIS PLACE HAS TO OFFER
                </h2>
                <div>
                  <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-4 md:gap-6 mt-4">
                    {shuffleArray(property.amenities)
                      ?.slice(0, 5)
                      .map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-lg bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <span className="text-blue-600">
                            <FaCheckCircle className="text-2xl" />
                          </span>
                          <span className="font-medium">{amenity}</span>
                        </div>
                      ))}
                  </div>
                </div>
              </section> */}

              {/* Description and Amenities */}
              <div className="grid gap-8 mt-6">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">DESCRIPTION</h2>
                    <p className="text-gray-700 whitespace-pre-line">
                      {property.description ||
                        `Leafy Greens was built as a retreat center for our family and friends. It is where people would visit to refresh their souls and mind. We work so hard to make this place to be one of the places that we can live in harmony with nature. That is why the cob houses are the right choice for us. Not only are the buildings eco-friendly but also the garden is organic. Visit here you will be able to take a deep breath and enjoy the fresh air with an organic environment. It is a perfect place to getaway!!`}
                    </p>
                  </div>

                  {/* amenities */}
                  <div className="text-gray-800">
                    <h2 className="w-full text-center text-2xl md:text-4xl font-bold md:p-4 md:m-5 mb-2 text-gray-800">WHAT YOU CAN EXPERIENCE</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {property.amenities?.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <FaCheckCircle className="text-green-500" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

      <Testimonials2/>

        {/* Footer */}
        <Footer/>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-[90vw] sm:max-w-lg max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">All Amenities</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <MdClose className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isImageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-[90vw] sm:max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">All Photos</h2>
                <button onClick={() => setIsImageModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <MdClose className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {property?.images?.map((image, index) => (
                  <div key={index} className="aspect-[4/3] relative rounded-lg overflow-hidden cursor-pointer">
                    <img
                      loading="lazy"
                      src={image.url || "/placeholder.svg"}
                      alt={`Property view ${index + 1}`}
                      className="absolute inset-0 w-full h-full object-cover hover:opacity-90 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

