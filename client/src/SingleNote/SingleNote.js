import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getNotebook } from '../Redux/Features/notebookSlice'
import { getNote, updateNote } from '../Redux/Features/noteSlice'
import Sidebar from '../SideNavBar/Sidebar'
import './SingleNote.css'
import jsPDF from 'jspdf'
import ReactTextareaAutosize from 'react-textarea-autosize'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import toast from 'react-hot-toast'
import rehypeHighlight from 'rehype-highlight'
import rehypeStarryNight from 'rehype-starry-night'
import { IonIcon } from '@ionic/react'
import { syncCircle, syncOutline } from 'ionicons/icons'

function SingleNote() {
  const [isPreview, setIsPreview] = useState(false)
  const [content, setContent] = useState('')
  const doc = new jsPDF()

  const dispatch = useDispatch()
  const { noteId } = useParams()

  const { note, loading } = useSelector((state) => state.note)
  const { notebook } = useSelector((state) => state.notebook)

  useEffect(() => {
    if (noteId) {
      dispatch(getNote(noteId))
    }
  }, [noteId, dispatch])

  useEffect(() => {
    if (note && note.body) {
      setContent(note.body)
      dispatch(getNotebook(note.notebookId))
    }
  }, [note, dispatch])

  const handelSubmit = (e) => {
    e.preventDefault()
    const noteData = {
      body: content,
      noteId: note._id,
    }
    toast.promise(dispatch(updateNote({ noteData })).unwrap(), {
      pending: 'Syncing...',
      success: 'Note synced successfully!',
      error: 'Failed to sync the note',
    })
  }

  if (loading || !note) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="single-note">
      <Sidebar />
      <div className="single-note-container">
        <div className="single-note-header">
          <h1>{note.title}</h1>

          <button onClick={handelSubmit} className='sync'>
            <IonIcon icon={syncCircle} size="large" />
          </button>
        </div>
        <div className="single-note-metadata">
          <p>{new Date(note.createdAt).toLocaleDateString()}</p>
          <p>|</p>
          <p>{notebook?.title}</p>
        </div>
        <div className="single-note-headings">
          <button
            className={`single-note-heading ${
              !isPreview ? 'single-note-heading-active' : ''
            }`}
            onClick={() => setIsPreview(false)}
          >
            Markdown
          </button>
          <button
            className={`single-note-heading ${
              isPreview ? 'single-note-heading-active' : ''
            }`}
            onClick={() => setIsPreview(true)}
          >
            Preview
          </button>
        </div>
        <div className="single-note-content">
          {!isPreview ? (
            <ReactTextareaAutosize
              placeholder="What did you like or dislike?"
              type="text"
              value={content}
              className="single-note-input"
              id="content"
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div className="single-note-output" id="rendered-output">
              <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {content}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleNote
