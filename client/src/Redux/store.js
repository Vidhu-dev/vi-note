import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Features/authSlice";
import NotebookReducer from "./Features/notebookSlice";
import NoteReducer from "./Features/noteSlice.js";
export default configureStore({
  reducer: { auth: AuthReducer, notebook: NotebookReducer, note: NoteReducer },
});
