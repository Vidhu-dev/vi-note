import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api.js'

export const login = createAsyncThunk(
  'auth/login',
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue)
      console.log(response.data)
      return response.data
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'An unexpected error occurred'
      return rejectWithValue(errorMessage)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ formValue }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue)
      return response.data
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'An unexpected error occurred'
      return rejectWithValue(errorMessage)
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logut',
  async ({ rejectWithValue }) => {
    try {
      // const response = await api.signOut()
      // return response.data
      localStorage.clear()
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: '',
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    setLogout: (state, action) => {
      state.user = null
      localStorage.clear()
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [login.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [register.pending]: (state, action) => {
      state.loading = true
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.setItem('profile', JSON.stringify({ ...action.payload }))
      state.user = action.payload
    },
    [register.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [logout.pending]: (state, action) => {
      state.loading = true
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false
      localStorage.clear()
      state.user = null
    },
    [logout.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})
export const { setUser, setLogout } = authSlice.actions
export default authSlice.reducer
