import './App.css'
import Sidebar from './SideNavBar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NotebookPage from './Notebook/NotebookPage'
import NotesPage from './Notes/NotesPage'
import Homepage from './Homepage/Homepage.css/Homepage'
import Todo from './Todo/Todo'
import SingleNote from './SingleNote/SingleNote'
import React from 'react'
import Login from './Login/Login'

import NewNotebookModal from './NewNotebookModal/NewNotebookModal'
import SingleNotebook from './Notebook/SingleNotebook'
import NewNoteModal from './NewNoteModal/NewNoteModal'
import { Toaster } from 'react-hot-toast'
import RequireAuth from './RequireAuth.js'


function App() {

  return (
    <div className="App">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Homepage />
              </RequireAuth>
            }
          />
          <Route
            path="/addNote"
            element={
              <RequireAuth>
                <NewNoteModal />
              </RequireAuth>
            }
          />
          <Route
            path="/notebook/:notebookId"
            element={
              <RequireAuth>
                <SingleNotebook />
              </RequireAuth>
            }
          />
          <Route
            path="/addNotebook"
            element={
              <RequireAuth>
                <NewNotebookModal />
              </RequireAuth>
            }
          />
          <Route
            path="/note/:noteId"
            element={
              <RequireAuth>
                <SingleNote />
              </RequireAuth>
            }
          />
          {/* Uncomment and wrap other routes as needed */}
          {/* <Route path="/todo" element={<Todo />} /> */}
          <Route
            path="/notes"
            element={
              <RequireAuth>
                <NotesPage />
              </RequireAuth>
            }
          />
          <Route
            path="/notebooks"
            element={
              <RequireAuth>
                <NotebookPage />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
