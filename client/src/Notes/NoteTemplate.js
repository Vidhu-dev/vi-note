import "./NoteTemplate.css";
import { IonIcon } from "@ionic/react";
import { createOutline, bookmark } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNotebook } from "../Redux/Features/notebookSlice";
function NoteTemplate(note) {
  const navigate = useNavigate();
  const handelClick = (e) => {
    e.preventDefault();
    navigate(`/note/${note.noteId}`);
  };
  const { notebook } = useSelector((state) => ({ ...state.notebook }));
  const notebookId = note.notebookId;
  console.log(notebookId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (notebookId) {
      dispatch(getNotebook(notebookId));
    }
  }, [notebookId]);

  return (
    <div
      style={{ backgroundColor: `${note.color}` }}
      onClick={handelClick}
      className="note-template"
    >
      <div className="note-template-top">
        <div className="note-template-date">{note.date}</div>
        <IonIcon icon={createOutline} />
      </div>
      <div className="note-template-body">
        <div className="note-template-body-heading">
          {note.name}
          <span>{notebook.title}</span>
        </div>

        <hr />
        <p>{note.content}</p>
      </div>
    </div>
  );
}
export default NoteTemplate;
