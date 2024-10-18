import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = JSON.parse(
      localStorage.getItem('profile')
    ).token
  }
  return req
})

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)
export const signOut = () => API.post('/users/signout')
export const isTokenValid = () => API.get('/users/isTokenvalid')

export const createNotebook = (notebookData) =>
  API.post('notebook/', notebookData)
export const getNotebooks = () => API.get('/notebook/')
export const getNotebook = (notebookId) => API.get(`/notebook/${notebookId}`)
export const updateNotebook = (notebookData) =>
  API.post(`/notebook/update/${notebookData._id}`, notebookData)
export const deleteNotebook = (notebookId) =>
  API.delete(`/notebook/delete/${notebookId}`)

export const createNote = (noteData) => API.post('/note/', noteData)
export const updateNote = (noteData) =>
  API.post(`/note/update/${noteData.noteId}`, noteData)
export const getNotes = () => API.get('/note')
export const getNotesByNotebook = (notebookId) =>
  API.get(`/note/notebook/${notebookId}`)
export const getNote = (noteId) => API.get(`/note/${noteId}`)
