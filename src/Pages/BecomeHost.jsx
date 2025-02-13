import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Upload, User, Mail, Phone, FileText, CreditCard, Home, MapPin, Users, Bed, Bath, ChevronLeft, ChevronRight, Plus, ImageIcon } from 'lucide-react'
import { createHostRequest } from './hostRequestsSlice'

export default function BecomeHost() {
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profileImage: null,
    governmentId: null,
    bankDetails: null,
    propertyType: '',
    propertyTitle: '',
    description: '',
    address: '',
    neighborhood: '',
    accessibility: '',
    maxGuests: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    customAmenities: '',
    basePrice: '',
    cleaningFee: '',
    extraGuestFee: '',
    propertyPhotos: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (name === 'propertyPhotos') {
      setFormData(prev => ({
        ...prev,
        propertyPhotos: [...Array.from(files)]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataToSend = new FormData()
    
    Object.keys(formData).forEach(key => {
      if (typeof formData[key] === 'string') {
        formDataToSend.append(key, formData[key])
      }
    })
    
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage)
    }
    if (formData.governmentId) {
      formDataToSend.append('governmentId', formData.governmentId)
    }
    if (formData.bankDetails) {
      formDataToSend.append('bankDetails', formData.bankDetails)
    }
    formData.propertyPhotos.forEach(photo => {
      formDataToSend.append('propertyPhotos', photo)
    })

    dispatch(createHostRequest(formDataToSend))
  }

  const renderFileUpload = (name, icon, label) => (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {icon}
          <p className="text-sm text-gray-500">{label}</p>
        </div>
        <input
          type="file"
          name={name}
          onChange={handleFileChange}
          className="hidden"
          accept={name === 'propertyPhotos' ? 'image/*' : '.pdf,image/*'}
          multiple={name === 'propertyPhotos'}
          required
        />
      </label>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Become a Host</h1>
          <p className="text-gray-600 mb-6">Fill out the form below to register as a host on our platform</p>

          <div className="mb-8">
            <div className="flex items-center">
              <div className={`flex-1 h-2 ${step >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              <div className={`flex-1 h-2 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Picture
                    </label>
                    {renderFileUpload('profileImage', 
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />,
                      'Click to upload profile picture'
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Government ID
                    </label>
                    {renderFileUpload('governmentId',
                      <FileText className="h-8 w-8 text-gray-400 mb-2" />,
                      'Upload government ID'
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bank Details
                    </label>
                    {renderFileUpload('bankDetails',
                      <CreditCard className="h-8 w-8 text-gray-400 mb-2" />,
                      'Upload bank details'
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Next
                    <ChevronRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Home className="h-5 w-5 mr-2" />
                  Property Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="villa">Villa</option>
                      <option value="cabin">Cabin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Title
                    </label>
                    <input
                      type="text"
                      name="propertyTitle"
                      value={formData.propertyTitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Property Photos
                    </label>
                    {renderFileUpload('propertyPhotos',
                      <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />,
                      'Upload property photos'
                    )}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 mr-2" />
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

