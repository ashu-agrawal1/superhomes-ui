"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProperties, createProperty, updateProperty, deleteProperty } from "../Redux/propertySlice"
import { Link } from "react-router-dom"
import { Trash2, Edit, Menu, X } from "lucide-react"
import { FaUser } from "react-icons/fa"
const Dashboard = () => {
  const predefinedAmenities = [
    "Hot water",
    "Laundry",
    "Washing machine",
    "TV",
    "Air conditioning",
    "Security cameras",
    "Fire extinguisher",
    "First aid kit",
    "Wifi",
    "Workspace",
    "Kitchen",
    "Parking",
    "Pets allowed",
  ]

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    price: "",
    location: "",
    bedrooms: "",
    amenities: [],
    imageFiles: [],
    bathrooms: "",
    is_premium: false,
    customAmenities: "",
    max_guests: "",
    beds: "", // Added beds to formData
  })

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const dispatch = useDispatch()
  const { loading, error, properties, premiumProperties, regularProperties } = useSelector((state) => state.property)

  useEffect(() => {
    dispatch(fetchProperties())
  }, [dispatch])

  const handleEdit = (property) => {
    setFormData({
      id: property.id,
      title: property.title || "",
      description: property.description || "",
      price: property.price || "",
      location: property.location || "",
      bedrooms: property.bedrooms || "",
      amenities: Array.isArray(property.amenities) ? property.amenities : [], // Fixed: Handle amenities as array
      imageFiles: [],
      bathrooms: property.bathrooms || "",
      is_premium: property.is_premium === 1,
      customAmenities: "",
      max_guests: property.max_guests || "",
      beds: property.beds || "", // Added beds to handleEdit
    })

    // Scroll to editing area
    document.querySelector("#editing-area").scrollIntoView({ behavior: "smooth" })
  }

  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
      dispatch(deleteProperty(propertyId)).then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(fetchProperties())
        }
      })
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      amenities: checked ? [...prevData.amenities, value] : prevData.amenities.filter((amenity) => amenity !== value),
    }))
  }

  const handleCustomAmenityChange = (e) => {
    const { value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      customAmenities: value,
    }))
  }

  const handleAddCustomAmenity = () => {
    if (formData.customAmenities.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        amenities: [...prevData.amenities, formData.customAmenities.trim()],
        customAmenities: "",
      }))
    } else {
      alert("Please enter a valid custom amenity")
    }
  }

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFiles: [...e.target.files],
    }))
  }

  const validateForm = () => {
    const requiredFields = ["title", "description", "price", "location", "beds"] // Added beds to requiredFields
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(", ")}`)
      return false
    }
    return true
  }

  const handlePublish = () => {
    if (!validateForm()) return

    const action = formData.id ? updateProperty : createProperty

    dispatch(action(formData)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setFormData({
          id: null,
          title: "",
          description: "",
          price: "",
          location: "",
          bedrooms: "",
          amenities: [],
          imageFiles: [],
          bathrooms: "",
          is_premium: false,
          customAmenities: "",
          max_guests: "",
          beds: "", // Added beds to setFormData
        })
        dispatch(fetchProperties())
      }
    })
  }

  const handleCancel = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      price: "",
      location: "",
      bedrooms: "",
      amenities: [],
      imageFiles: [],
      bathrooms: "",
      is_premium: false,
      customAmenities: "",
      max_guests: "",
      beds: "", // Added beds to handleCancel
    })
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Toaster position="top-right" /> */}
      <header className="bg-blue-600 p-4 text-white font-bold text-2xl flex justify-between items-center">
        <FaUser />
        <h1 className="text-center flex-1">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-white font-semibold text-xl hidden md:block">
            Home
          </Link>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <nav className="bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div
            className={`flex flex-col md:flex-row justify-center py-2 ${isMobileMenuOpen ? "block" : "hidden md:flex"}`}
          >
            <Link to="/dashboard" className="hover:underline py-2 md:px-2">
              Dashboard
            </Link>
            <Link to="/upcoming-bookings" className="hover:underline py-2 md:px-2">
              Upcoming Bookings
            </Link>
            <Link to="/todays-bookings" className="hover:underline font-bold py-2 md:px-2">
              Today's Bookings
            </Link>
            <Link to="/calendar" className="hover:underline py-2 md:px-2">
              Calendar
            </Link>
          </div>
        </div>
      </nav>

      <main className="p-6 space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4">Premium Listings</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {premiumProperties?.map((property) => (
              <div key={property.id} className="bg-white shadow-md rounded-lg p-4 space-y-2">
                <div className="h-40 bg-gray-300 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={property.images?.[0]?.url || "/placeholder.jpg"}
                    alt={`${property.title} property`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs inline-block mb-2">
                  Premium
                </div>
                <h3 className="font-bold text-lg">{property.title}</h3>
                <p className="text-sm text-gray-600">Location: {property.location}</p>
                <p className="text-sm text-gray-600">Price: ₹{property.price}</p>
                <p className="text-sm text-gray-600">
                  {property.bedrooms} Bedrooms • {property.bathrooms} Baths • {property.beds} Beds • Max Guests:{" "}
                  {property.max_guests}
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => handleEdit(property)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Regular Listings</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularProperties?.map((property) => (
              <div key={property.id} className="bg-white shadow-md rounded-lg p-4 space-y-2">
                <div className="h-40 bg-gray-300 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src={property.images?.[0]?.url || "/placeholder.jpg"}
                    alt={`${property.title} property`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-bold text-lg">{property.title}</h3>
                <p className="text-sm text-gray-600">Location: {property.location}</p>
                <p className="text-sm text-gray-600">Price: ₹{property.price}</p>
                <p className="text-sm text-gray-600">
                  {property.bedrooms} Bedrooms • {property.bathrooms} Baths • {property.beds} Beds • Max Guests:{" "}
                  {property.max_guests}
                </p>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                    onClick={() => handleEdit(property)}
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    className="flex items-center gap-1 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-colors"
                    onClick={() => handleDelete(property.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="editing-area">
          <h2 className="text-xl font-semibold mb-4">{formData.id ? "Edit Property" : "Add New Property"}</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
                rows={3}
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              />
              <input
                type="number"
                name="bedrooms"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              />
              <input
                type="number"
                name="beds"
                placeholder="Beds"
                value={formData.beds}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              />
              <input
                type="number"
                name="bathrooms"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              />
              <input
                type="number"
                name="max_guests"
                placeholder="Max Guests"
                value={formData.max_guests}
                onChange={handleInputChange}
                className="p-2 border rounded-md w-full"
              />
              <div className="lg:col-span-2 space-y-4">
                <label className="block font-medium">Amenities</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {predefinedAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={amenity}
                        checked={formData.amenities.includes(amenity)}
                        onChange={handleAmenityChange}
                        className="w-4 h-4"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    name="customAmenities"
                    placeholder="Add a custom amenity"
                    value={formData.customAmenities}
                    onChange={handleCustomAmenityChange}
                    className="p-2 border rounded-md flex-1"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomAmenity}
                    className="bg-blue-600  text-white p-2 rounded whitespace-nowrap hover:bg-blue-700 transition-colors"
                  >
                    Add Custom
                  </button>
                </div>

                {formData.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.amenities.map((amenity) => (
                      <span key={amenity} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="is_premium"
                  checked={formData.is_premium}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <label htmlFor="is_premium">Premium Listing</label>
              </div>

              <div className="lg:col-span-2">
                <label className="block font-medium mb-2">Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="p-2 border rounded-md w-full"
                />
                {formData.imageFiles.length > 0 && (
                  <p className="mt-2 text-sm text-gray-600">{formData.imageFiles.length} files selected</p>
                )}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                onClick={handlePublish}
              >
                {formData.id ? "Update" : "Publish"}
              </button>
              {formData.id && (
                <button
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-blue-700 text-white text-center py-4 mt-12">
        <p>© 2024 Admin Dashboard. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Dashboard

