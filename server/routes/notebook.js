import express from 'express'
import {
  createNotebook,
  getNotebooks,
  getNotebook,
  updateNoteBook,
  deleteNotebook,
} from '../controllers/notebook.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/', auth, createNotebook)
router.get('/', auth, getNotebooks)
router.get('/:id', auth, getNotebook)
router.post('/update/:id', auth, updateNoteBook)
router.delete('/delete/:id', auth, deleteNotebook)
router.get('/filter/:filter', auth, getNotebook)
export default router
