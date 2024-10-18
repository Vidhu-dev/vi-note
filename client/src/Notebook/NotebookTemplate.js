import './NotebookTemplate.css'
import { IonIcon } from '@ionic/react'
import { createOutline, bookmark, closeCircleOutline } from 'ionicons/icons'
import { Link, useNavigate } from 'react-router-dom'
function NotebookTemplate(notebook) {
  const navigate = useNavigate()
  const handelClick = (e) => {
    e.preventDefault()
    navigate(`/notebook/${notebook.id}`)
  }

  return (
    <div
      style={{ backgroundColor: `${notebook.color}` }}
      onClick={handelClick}
      className="notebook-template"
    >
      <IonIcon class="notebook-template-icon" icon={bookmark} />
      <div className="notebook-template-line"></div>
      <div className="notebook-template-top">
        <p>{notebook.name}</p>
        <Link
          to={`/editNotebook/${notebook.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          <IonIcon icon={createOutline} className="edit" />
        </Link>
      </div>
      <div className="notebook-template-date">
        {new Date(notebook.date).toDateString()}
      </div>
      {/* <IonIcon class="notebook-template-icon" icon={closeCircleOutline} /> */}
    </div>
  )
}
export default NotebookTemplate
