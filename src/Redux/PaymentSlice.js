import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const baseurl = process.env.REACT_APP_BASE_URL;

// API URL base
const API_URL = baseurl + "reservation";
const PAYMENT_API_URL = baseurl + "payments";

// Async thunk to create a reservation
export const createReservation = createAsyncThunk(
  "payment/createReservation",
  async (reservationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/Createreservations`,
        reservationData
      );
      toast.success("Reservation created successfully!");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to create Razorpay order
export const createRazorpayOrder = createAsyncThunk(
  "payment/createRazorpayOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${PAYMENT_API_URL}/order`, orderData);
      // console.log("payment response->",response.data);
      return response.data; // Razorpay order data (order_id, etc.)
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to validate the payment and create reservation

export const validatePayment = createAsyncThunk(
  "payment/validatePayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${PAYMENT_API_URL}/validate`,
        paymentData
      );
      return response.data; // Payment validation success message
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to update payment status
export const updatePaymentStatus = createAsyncThunk(
  "payment/updatePaymentStatus",
  async ({ reservation_id, payment_status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/paymentStatus`, {
        reservation_id,
        payment_status,
      });
      return response.data; // Payment status update message
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);

// Async thunk to fetch user reservations
export const getUserReservations = createAsyncThunk(
  "payment/getUserReservations",
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/getReservationByUserID/${user_id}`
      );
      return response.data; // List of user reservations
    } catch (error) {
      return rejectWithValue(error.response.data); // Handle error
    }
  }
);
export const getAllReservations = createAsyncThunk(
  "payment/getAllReservations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/getReservation`);
      return response.data; // This should be the array of reservations
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch reservations" }
      );
    }
  }
);
// PaymentSlice
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    reservation: null,
    razorpayOrder: null, // Store Razorpay order data
    paymentStatus: "pending", // pending, success, failed
    reservations: [], // Array of user reservations
    allReservations: [], // Array of all reservations (if needed)
    error: null,
    loading: false,
  },
  reducers: {
    resetPaymentStatus: (state) => {
      state.paymentStatus = "pending";
      state.error = null;
    },
    resetReservations: (state) => {
      state.reservations = [];
      state.error = null;
    },
    resetAllReservations: (state) => {
      state.allReservations = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle getAllReservations (all reservations in the system)
    builder
      .addCase(getAllReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure that allReservations is always an array
        state.allReservations = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch reservations";
        state.allReservations = []; // Reset to empty array on error
      });

    // Handle getUserReservations (user-specific reservations)
    builder
      .addCase(getUserReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.reservations = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
      })
      .addCase(getUserReservations.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch user reservations";
        state.reservations = [];
      });
  },
});

export const { resetPaymentStatus, resetReservations, resetAllReservations } =
  paymentSlice.actions;
export default paymentSlice.reducer;
