import { useEffect } from "react";
import "./Notes.css";
import NoteTemplate from "./NoteTemplate";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotes, getNotesByNotebook } from "../Redux/Features/noteSlice";
import Filter from "../Filter/Filter";

function Notes(props) {
  const { notes, loading } = useSelector((state) => ({
    ...state.note,
  }));
  const dispatch = useDispatch();
  const notebookId = props.notebookId;
  useEffect(() => {
    if (props.notebookId === "all") {
      dispatch(getNotes());
    } else {
      dispatch(getNotesByNotebook({ notebookId }));
    }
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="note">
      <p>NOTES</p>
      <hr />
      <Filter />
      <div className="note-gallery">
        {notes.map((note) => (
          <NoteTemplate
            name={note.title}
            date={note.createdAt}
            content={note.body}
            noteId={note._id}
            notebookId={note.notebookId}
            color = {note.color}
          ></NoteTemplate>
        ))}
        <Link to="/addNote" className="note-gallery-add-note">
          <button id="add-new">
            <IonIcon id="add" icon={add} />
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Notes;
