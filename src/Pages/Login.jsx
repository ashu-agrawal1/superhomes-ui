import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Redux/AuthSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ChromeIcon as Google, Apple, Facebook, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(credentials));
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto p-8 bg-gray-200">
        <h2 className="text-center text-5xl font-bold text-gray-900 mb-6">LOGIN</h2>

        {error && <p className="text-red-500 text-center mb-4">{error.message || JSON.stringify(error)}</p>}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-medium">EMAIL*</label>
            <input
              id="email"
              name="email"
              type="text"
              required
              className="w-full border border-gray-300 bg-gray-100 p-3 rounded-md"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">PASSWORD*</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full border border-gray-300 bg-gray-100 p-3 rounded-md pr-10"
                placeholder="Enter your password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-600" /> : <Eye className="h-5 w-5 text-gray-600" />}
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to='/forgetPassword' className="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </div>
        </form>

        {/* <div className="mt-6 flex items-center justify-center space-x-4">
          <button type="button" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Sign in with Google">
            <Google className="h-5 w-5 text-gray-600" />
          </button>
          <button type="button" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Sign in with Apple">
            <Apple className="h-5 w-5 text-gray-600" />
          </button>
          <button type="button" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Sign in with Facebook">
            <Facebook className="h-5 w-5 text-gray-600" />
          </button>
        </div> */}
      </div>

      <br />
      <Footer />
    </div>
  );
};

export default Login;
