import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Notes from '../Notes/Notes'
import { deleteNotebook, getNotebook } from '../Redux/Features/notebookSlice'
import Sidebar from '../SideNavBar/Sidebar'
import './SingleNotebook.css'
import { IonIcon } from '@ionic/react'
import { closeCircleOutline, trash } from 'ionicons/icons'
import toast from 'react-hot-toast'
function SingleNotebook() {
  const dispatch = useDispatch()
  const { notebook } = useSelector((state) => ({ ...state.notebook }))
  const { notebookId } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    if (notebookId) {
      dispatch(getNotebook(notebookId))
    }
  }, [notebookId, dispatch])
  async function handleDeleteNotebook() {
    console.log('delete notebook', notebookId)
    await toast.promise(dispatch(deleteNotebook({ notebookId })).unwrap(), {
      loading: 'Deleting Notebook...',
      success: 'Notebook Deleted Successfully',
      error: 'Failed to delete Notebook',
    })
    navigate(-1)
  }
  return (
    <div className="single-notebook">
      <Sidebar />
      <div
        style={{ borderColor: `${notebook.color}` }}
        className="single-notebook-container"
      >
        <div className="single-notebook-container-header">
          <h1>{notebook.title}</h1>
          <IonIcon
            icon={trash}
            className="delete"
            onClick={handleDeleteNotebook}
          />
        </div>

        <span className="single-notebook-container-date">
          {new Date(notebook.createdAt).toLocaleString()}
        </span>

        <p>{notebook.description}</p>
        <Notes notebookId={notebookId} />
      </div>
    </div>
  )
}

export default SingleNotebook
