import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { URL } from "../../config"

const BASE_URL = URL + "api/v1/reservation"

// Async thunk to fetch property availability by ID
export const fetchPropertyAvailabilityById = createAsyncThunk(
  "propertyAvailability/fetchById",
  async (propertyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/getReservationByPropertyID/${propertyId}`)
      return response.data
    } catch (error) {
      console.error("API Error:", error)
      return rejectWithValue(error.response?.data?.error || "Failed to fetch availability")
    }
  },
)

// Async thunk to add property availability
export const addPropertyAvailability = createAsyncThunk(
  "propertyAvailability/addAvailability",
  async ({ property_id, start_date, end_date, is_booked = 0, number_of_guests, user_id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/Createreservations`, {
        property_id,
        start_date,
        end_date,
        is_booked,
        number_of_guests,
        user_id,
      })
      return response.data
    } catch (error) {
      console.error("API Error:", error)
      return rejectWithValue(error.response?.data?.error || "Failed to add availability")
    }
  },
)

// Async thunk to check booking conflicts
export const checkBookingConflicts = createAsyncThunk(
  "propertyAvailability/checkBookingConflicts",
  async ({ selectedStartDate, selectedEndDate, propertyId }, { rejectWithValue }) => {
    try {
      const reservationResponse = await axios.get(`${BASE_URL}/getReservationByPropertyID/${propertyId}`)
      const reservationData = reservationResponse.data.data

      const hasConflictWithReservations = reservationData.some((reservation) => {
        const reservationStartDate = new Date(reservation.start_date)
        const reservationEndDate = new Date(reservation.end_date)

        return (
          (selectedStartDate >= reservationStartDate && selectedStartDate <= reservationEndDate) ||
          (selectedEndDate >= reservationStartDate && selectedEndDate <= reservationEndDate) ||
          (selectedStartDate <= reservationStartDate && selectedEndDate >= reservationEndDate)
        )
      })

      return hasConflictWithReservations
    } catch (error) {
      console.error("API Error:", error)
      return rejectWithValue(error.response?.data?.error || "Failed to check conflicts")
    }
  },
)

// Initial state
const initialState = {
  availability: null,
  conflict: null,
  status: "idle",
  error: null,
}

// Slice
const propertyAvailabilitySlice = createSlice({
  name: "propertyAvailability",
  initialState,
  reducers: {
    clearAvailabilityState: (state) => {
      state.availability = null
      state.conflict = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Property Availability
      .addCase(fetchPropertyAvailabilityById.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchPropertyAvailabilityById.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.availability = action.payload
      })
      .addCase(fetchPropertyAvailabilityById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      // Add Property Availability
      .addCase(addPropertyAvailability.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(addPropertyAvailability.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.availability = action.payload
      })
      .addCase(addPropertyAvailability.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      // Check Booking Conflicts
      .addCase(checkBookingConflicts.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(checkBookingConflicts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.conflict = action.payload
      })
      .addCase(checkBookingConflicts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

export const { clearAvailabilityState } = propertyAvailabilitySlice.actions
export default propertyAvailabilitySlice.reducer

