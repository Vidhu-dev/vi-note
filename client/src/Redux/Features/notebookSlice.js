import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api.js'

export const createNotebook = createAsyncThunk(
  'notebook/createNotebook',
  async ({ notebookData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createNotebook(notebookData)
      navigate('/')
      toast.success('Notebook Added sucessfully')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateNotebook = createAsyncThunk(
  'notebook/updateNotebook',
  async ({ notebookData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateNotebook(notebookData)
      navigate('/')
      toast.success('Notebook Added sucessfully')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const deleteNotebook = createAsyncThunk(
  'notebook/deleteNotebook',
  async ({ notebookId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteNotebook(notebookId)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
export const getNotebooks = createAsyncThunk(
  'notebook/getNotebooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getNotebooks()
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)


export const getNotebook = createAsyncThunk(
  'notebook/getNotebook',
  async (notebookId, { rejectWithValue }) => {
    try {
      const response = await api.getNotebook(notebookId)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)
const notebookSlice = createSlice({
  name: 'notebook',
  initialState: {
    notebook: {},
    notebooks: [],
    error: '',
    loading: false,
  },

  extraReducers: {
    [createNotebook.pending]: (state, action) => {
      state.loading = true
    },
    [createNotebook.fulfilled]: (state, action) => {
      state.loading = false
      state.notebooks = [action.payload]
    },
    [createNotebook.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getNotebooks.pending]: (state, action) => {
      state.loading = true
    },
    [getNotebooks.fulfilled]: (state, action) => {
      state.loading = false
      state.notebooks = action.payload
    },
    [getNotebooks.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [getNotebook.pending]: (state, action) => {
      state.loading = true
    },
    [getNotebook.fulfilled]: (state, action) => {
      state.loading = false
      state.notebook = action.payload
    },
    [getNotebook.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
    [deleteNotebook.pending]: (state, action) => {
      state.loading = true
    },
    [deleteNotebook.fulfilled]: (state, action) => {
      state.loading = false
      state.notebook = action.payload
    },
    [deleteNotebook.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload.message
    },
  },
})

export default notebookSlice.reducer
