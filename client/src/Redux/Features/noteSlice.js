import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";

export const createNote = createAsyncThunk(
  "note/createNote",
  async ({ noteData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createNote(noteData);
      navigate("/");
      toast.success("Note Added sucessfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateNote = createAsyncThunk(
  "note/updateNote",
  async ({ noteData }, { rejectWithValue }) => {
    try {
      const response = await api.updateNote(noteData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getNotes = createAsyncThunk(
  "note/getNotes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getNotes();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getNote = createAsyncThunk(
  "note/getNote",
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await api.getNote(noteId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getNotesByNotebook = createAsyncThunk(
  "note/getNotesByNotebook",
  async ({ notebookId }, { rejectWithValue }) => {
    try {
      const response = await api.getNotesByNotebook(notebookId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const noteSlice = createSlice({
  name: "note",
  initialState: {
    note: {},
    notes: [],
    error: "",
    loading: false,
  },

  extraReducers: {
    [createNote.pending]: (state, action) => {
      state.loading = true;
    },
    [createNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = [action.payload];
    },
    [createNote.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateNote.pending]: (state, action) => {
      state.loading = true;
    },
    [updateNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = [action.payload];
    },
    [updateNote.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getNotes.pending]: (state, action) => {
      state.loading = true;
    },
    [getNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    [getNotes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getNotesByNotebook.pending]: (state, action) => {
      state.loading = true;
    },
    [getNotesByNotebook.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = action.payload;
    },
    [getNotesByNotebook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getNote.pending]: (state, action) => {
      state.loading = true;
    },
    [getNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.note = action.payload;
    },
    [getNote.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export default noteSlice.reducer;
