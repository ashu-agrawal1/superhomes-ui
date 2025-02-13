import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-hot-toast"
import { URL } from "../../config"

const BASE_URL = URL + "api/v1/user"

// Async thunk for user registration
export const registerUser = createAsyncThunk("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match")
    }

    const response = await axios.post(`${BASE_URL}/register`, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "user",
      phone_number: userData.phone_number,
      age: userData.age ? Number(userData.age) : undefined,
      birthdate: userData.birthdate,
    })

    if (response.data.success) {
      toast.success("Registration successful!")
      return response.data
    }
    return rejectWithValue(response.data)
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.response?.data?.message || error.message || "Registration failed!"
    toast.error(errorMessage)
    return rejectWithValue({ message: errorMessage })
  }
})

// Async thunk for user login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData)

    if (response.data.success) {
      const user = response.data.user
      if (!user || !user.email) {
        throw new Error("Invalid user data received")
      }
      localStorage.setItem("user", JSON.stringify(user))
      toast.success("Login successful!")
      return response.data
    }
    return rejectWithValue(response.data)
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || error.response?.data?.message || error.message || "Login failed!"
    toast.error(errorMessage)
    return rejectWithValue({ message: errorMessage })
  }
})

// Async thunk for OTP verification
export const verifyOTP = createAsyncThunk("auth/verifyOTP", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-otp`, data)

    if (response.data.success) {
      toast.success("OTP verification successful!")
      return response.data
    }
    return rejectWithValue(response.data)
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.response?.data?.message || "OTP verification failed!"
    toast.error(errorMessage)
    return rejectWithValue({ message: errorMessage })
  }
})

// Async thunk for requesting password reset
export const requestPasswordReset = createAsyncThunk(
  "auth/requestPasswordReset",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, { email })
      if (response.data.success) {
        toast.success("Password reset OTP sent to your email!")
        return response.data
      }
      return rejectWithValue(response.data)
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to send reset OTP"
      toast.error(errorMessage)
      return rejectWithValue({ message: errorMessage })
    }
  },
)

// Async thunk for resetting password
export const resetPassword = createAsyncThunk("auth/resetPassword", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password`, data)
    if (response.data.success) {
      toast.success("Password reset successful!")
      return response.data
    }
    return rejectWithValue(response.data)
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Password reset failed"
    toast.error(errorMessage)
    return rejectWithValue({ message: errorMessage })
  }
})

// Async thunk for user logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { dispatch }) => {
  try {
    localStorage.removeItem("user")
    dispatch(clearUserData())
    toast.success("Logged out successfully!")
    return true
  } catch (error) {
    toast.error("Logout failed!")
    return false
  }
})

// Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { dispatch }) => {
  try {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      if (!user || !user.email) {
        throw new Error("Invalid user data in storage")
      }
      return user
    }
    return null
  } catch (error) {
    dispatch(clearUserData())
    return null
  }
})

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isOTPModalOpen: false,
  otpEmail: "",
  registrationSuccess: false,
  loginSuccess: false,
  passwordResetRequested: false,
  passwordResetSuccess: false,
}

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserData: (state) => {
      return { ...initialState }
    },
    openOTPModal: (state, action) => {
      state.isOTPModalOpen = true
      state.otpEmail = action.payload
    },
    closeOTPModal: (state) => {
      state.isOTPModalOpen = false
      state.otpEmail = ""
    },
    clearError: (state) => {
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.registrationSuccess = false
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.registrationSuccess = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.registrationSuccess = false
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.loginSuccess = false
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.loginSuccess = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.loginSuccess = false
      })
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false
        state.isOTPModalOpen = false
        state.otpEmail = ""
        state.error = null
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Request password reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.loading = true
        state.error = null
        state.passwordResetRequested = false
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.passwordResetRequested = true
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.passwordResetRequested = false
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = null
        state.passwordResetSuccess = false
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false
        state.error = null
        state.passwordResetSuccess = true
        state.passwordResetRequested = false
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.passwordResetSuccess = false
      })
      // Logout user
      .addCase(logoutUser.fulfilled, (state) => {
        return { ...initialState }
      })
      // Check auth status
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = !!action.payload
        state.loading = false
      })
  },
})

// Export actions
export const { clearUserData, openOTPModal, closeOTPModal, clearError, setLoading } = authSlice.actions

// Export reducer
export default authSlice.reducer

