import React from 'react'
import NewNotebookModal from './NewNotebookModal'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function UpdateNotebookModal() {
  const notebooks = useSelector((state) => state.notebook.notebooks)
  const notebookId = useParams().notebookId
  const notebook = notebooks.find((notebook) => notebook._id === notebookId)
  const { title, description, color, _id } = notebook
  return (
    <>
      <NewNotebookModal
        operation="update"
        initialState={{ title, description, color, _id }}
      />
    </>
  )
}

export default UpdateNotebookModal
