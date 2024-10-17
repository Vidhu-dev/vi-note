import Notes from "./Notes";
import "./Notes.css";
import Sidebar from "../SideNavBar/Sidebar";
function NotesPage() {
  return (
    <div className="note-page">
      <Sidebar />
      <div className="note-container">
        <Notes notebookId = "all" />
      </div>
    </div>
  );
}
export default NotesPage;
