
import { useState } from 'react'
import { FaFacebook, FaApple, FaChevronLeft } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { MdEmail } from 'react-icons/md'
import { HiChevronDown } from 'react-icons/hi'

export default function Cart() {
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <h1 className="text-2xl font-semibold">Confirm and pay</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Your trip</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Dates</h3>
                    <p className="text-gray-600">5–10 Jan 2025</p>
                  </div>
                  <button className="text-black underline font-medium">Edit</button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Guests</h3>
                    <p className="text-gray-600">1 guest</p>
                  </div>
                  <button className="text-black underline font-medium">Edit</button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Log in or sign up to book</h2>
              
              <div className="space-y-4">
                <div className="relative">
                  <select className="w-full p-4 border rounded-t-lg appearance-none bg-white">
                    <option>India (+91)</option>
                  </select>
                  <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2" />
                </div>
                
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className="w-full p-4 border -mt-[1px] focus:relative focus:z-10 focus:outline-none focus:border-black"
                />

                <p className="text-xs text-gray-600">
                  We'll call or text you to confirm your number. Standard message and data rates apply. 
                  <a href="#" className="underline">Privacy Policy</a>
                </p>

                <button className="w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-opacity-90 transition-colors">
                  Continue
                </button>

                <div className="relative text-center my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <span className="relative bg-white px-4 text-sm text-gray-500">or</span>
                </div>

                <div className="space-y-4">
                  <button className="w-full border rounded-lg p-3 flex items-center justify-center gap-3 hover:bg-gray-50">
                    <FaFacebook className="w-5 h-5 text-[#1877F2]" />
                    <span>Continue with Facebook</span>
                  </button>
                  
                  <button className="w-full border rounded-lg p-3 flex items-center justify-center gap-3 hover:bg-gray-50">
                    <FcGoogle className="w-5 h-5" />
                    <span>Continue with Google</span>
                  </button>
                  
                  <button className="w-full border rounded-lg p-3 flex items-center justify-center gap-3 hover:bg-gray-50">
                    <FaApple className="w-5 h-5" />
                    <span>Continue with Apple</span>
                  </button>
                  
                  <button className="w-full border rounded-lg p-3 flex items-center justify-center gap-3 hover:bg-gray-50">
                    <MdEmail className="w-5 h-5" />
                    <span>Continue with email</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Price Details */}
          <div className="lg:pl-12">
            <div className="border rounded-xl p-6 sticky top-8">
              <div className="flex gap-4 pb-6 border-b">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Property"
                  className="w-32 h-24 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium">Soul Serenity-Pool,Patio-Trek Trails@Trimbakeshwar</h3>
                  <p className="text-sm text-gray-600">Entire home</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span>★</span>
                    <span>5.00</span>
                    <span className="text-gray-600">(1 review)</span>
                  </div>
                </div>
              </div>

              <div className="py-6 space-y-4">
                <h3 className="text-xl font-semibold">Price details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>₹13,152 x 5 nights</span>
                    <span>₹65,760</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>₹11,836.8</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t font-semibold">
                    <span>Total (INR)</span>
                    <span>₹77,596.8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span>© 2024 Airbnb, Inc.</span>
              <span>·</span>
              <a href="#" className="hover:underline">Privacy</a>
              <span>·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span>·</span>
              <a href="#" className="hover:underline">Sitemap</a>
              <span>·</span>
              <a href="#" className="hover:underline">Company details</a>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2">
                <span>English (IN)</span>
                <HiChevronDown className="w-4 h-4" />
              </button>
              <button>₹ INR</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

