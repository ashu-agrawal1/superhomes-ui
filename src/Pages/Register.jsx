import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../Redux/AuthSlice"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Eye, EyeOff } from "lucide-react"

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.auth)
  const { isOTPModalOpen } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    age: "",
    birthdate: "",
    role: "user",
  })

  const [validationError, setValidationError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = ["name", "email", "password", "confirmPassword", "age", "birthdate", "phone_number"];
    const missingFields = requiredFields.filter((field) => !formData[field]);
  
    if (missingFields.length > 0) {
      setValidationError(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }
  
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match!");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setValidationError("Please enter a valid email address");
      return;
    }
  
    if (isNaN(Number(formData.age))) {
      setValidationError("Age must be a valid number");
      return;
    }
  
    if (formData.phone_number && !/^\d{10}$/.test(formData.phone_number)) {
      setValidationError("Phone number must be 10 digits");
      return;
    }
  
    try {
      const resultAction = await dispatch(registerUser({ ...formData, age: Number(formData.age) }));
  
      console.log("📌 Dispatch resultAction:", resultAction);
  
      // ✅ Navigate to OTP if "OTP sent" is present, no matter what
      if (resultAction.payload?.message?.includes("OTP sent")) {
        console.log("✅ Navigating to OTP screen...");
        navigate("/otp");  // Replace with your navigation function
      } else {
        console.log("⚠️ Registration failed.");
        setValidationError(resultAction.payload?.message || "Registration failed.");
      }
    } catch (err) {
      console.error("❌ Registration failed:", err);
      setValidationError("Something went wrong. Please try again.");
    }
  };
  
  
  useEffect(() => {
    console.log("🔄 useEffect triggered with otpSent:", otpSent);
  
    if (otpSent) {
      console.log("✅ OTP Sent detected, navigating to /otp...");
      navigate("/otp");
    }
  }, [otpSent, navigate]);
  
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="w-full max-w-5xl mx-auto p-6 my-8">
        <h1 className="text-5xl font-bold text-center mb-8">GET REGISTERED</h1>

        {otpSent && (
          <div className="mb-6 p-3 bg-green-100 text-green-600 rounded text-center">
            OTP sent to your email. Please verify to complete registration. Redirecting to OTP page...
          </div>
        )}

        {(validationError || error) && (
          <div className="mb-6 p-3 bg-red-100 text-red-600 rounded">{validationError || error.message}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 w-full mx-auto bg-gray-200 p-8 rounded-lg">
          <div>
            <label className="block text-sm font-semibold mb-1">NAME*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">AGE*</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">BIRTHDATE*</label>
              <input
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">EMAIL*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">PHONE NUMBER*</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold mb-1">PASSWORD*</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-8 text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold mb-1">RE-ENTER PASSWORD*</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-8 text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 mt-6"
          >
            {loading ? "REGISTERING..." : "REGISTER NOW"}
          </button>
        </form>

        {/* <div className="flex justify-center space-x-4 mt-6">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-facebook"></i>
          </a>
        </div> */}
      </div>

      <Footer />
    </div>
  )
}

export default Register
