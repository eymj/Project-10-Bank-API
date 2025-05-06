import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const token = getState().auth.token
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3001' }/api/v1/user/profile`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    firstName: null,
    lastName: null,
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'ok'
        console.log(action)
        state.firstName = action.payload.body.firstName
        state.lastName = action.payload.body.lastName
      })
  },
})

export default profileSlice.reducer
