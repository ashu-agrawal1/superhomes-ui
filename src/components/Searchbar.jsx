import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchFilteredProperties } from "../Redux/propertySlice"
import toast from "react-hot-toast"


export default function SearchBar() {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkin: null,
    checkout: null,
    guests: "", // Add guests state
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams({ ...searchParams, [name]: value })
  }

  const handleDateChange = (name, date) => {
    setSearchParams({ ...searchParams, [name]: date })
  }

  const handleSearch = () => {
    const filters = {}

    if (searchParams.destination) filters.destination = searchParams.destination
    if (searchParams.checkin) filters.checkin = searchParams.checkin.toISOString().split("T")[0]
    if (searchParams.checkout) filters.checkout = searchParams.checkout.toISOString().split("T")[0]
    if (searchParams.guests) filters.max_guests = Number.parseInt(searchParams.guests) // Convert to integer

    // Add console.log to debug the filters being sent
    console.log("Sending filters:", filters)

    dispatch(fetchFilteredProperties(filters))
      .unwrap()
      .then((response) => {
        // Add console.log to debug the response
        console.log("API Response:", response)

        if (response.length === 0) {
          toast.error("No property available for your criteria", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        } else {
          navigate("/filter")
        }
      })
      .catch((error) => {
        // Add more detailed error logging
        console.error("Error details:", error)
        toast.error("No property available for your criteria.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      })
  }

  return (
    <div className="flex flex-col items-center mt-6 px-4">
      <div className="flex flex-wrap justify-center gap-4 mb-6 sm:flex-row lg:flex-row lg:gap-4">
        {/* Where Input */}
        <div className="relative bg-[#EAEAEA] border border-gray-300 rounded-md w-full sm:w-60 md:w-72 lg:w-56 h-28 flex flex-col justify-center items-center">
          <label className="absolute text-gray-500 font-bold lg:left-4 left-1/2 lg:translate-x-0 -translate-x-1/2 top-8">
            Where ?
          </label>
          <input
            type="text"
            name="destination"
            value={searchParams.destination}
            onChange={handleInputChange}
            placeholder="Search Destinations"
            className="bg-transparent border-none outline-none w-full h-full p-4 pt-12 text-center lg:text-left lg:pl-4"
          />
        </div>

        {/* Check In Input */}
        <div className="relative bg-[#EAEAEA] border border-gray-300 rounded-md w-full sm:w-60 md:w-72 lg:w-56 h-28 flex flex-col justify-center items-center">
          <label className="absolute text-gray-500 font-bold lg:left-8 left-1/2 lg:translate-x-0 -translate-x-1/2 top-8">
            Check In
          </label>
          <DatePicker
            selected={searchParams.checkin}
            onChange={(date) => handleDateChange("checkin", date)}
            placeholderText="Select Check-In Date"
            className="bg-transparent border-none outline-none w-full h-full p-4 pt-12 text-center lg:text-left lg:pl-8"
          />
        </div>

        {/* Check Out Input */}
        <div className="relative bg-[#EAEAEA] border border-gray-300 rounded-md w-full sm:w-60 md:w-72 lg:w-56 h-28 flex flex-col justify-center items-center">
          <label className="absolute text-gray-500 font-bold lg:left-8 left-1/2 lg:translate-x-0 -translate-x-1/2 top-8">
            Check Out
          </label>
          <DatePicker
            selected={searchParams.checkout}
            onChange={(date) => handleDateChange("checkout", date)}
            placeholderText="Select Check-Out Date"
            className="bg-transparent border-none outline-none w-full h-full p-4 pt-12 text-center lg:text-left lg:pl-8"
          />
        </div>

        {/* Guests Input */}
        <div className="relative bg-[#EAEAEA] border border-gray-300 rounded-md w-full sm:w-60 md:w-72 lg:w-56 h-28 flex flex-col justify-center items-center">
          <label className="absolute text-gray-500 font-bold lg:left-8 left-1/2 lg:translate-x-0 -translate-x-1/2 top-8">
            Guests
          </label>
          <input
            type="number"
            name="guests"
            value={searchParams.guests}
            onChange={handleInputChange}
            placeholder="Number of guests"
            min="1"
            className="bg-transparent border-none outline-none w-full h-full p-4 pt-12 text-center lg:text-left lg:pl-8"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-[#0044C1] text-white px-6 h-28 w-full sm:w-60 md:w-72 lg:w-56 rounded-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <FaSearch className="text-3xl" />
          <span className="font-medium">Search Properties</span>
        </button>
      </div>
    </div>
  )
}

