// import Header from "../Header";
// import Sidebar from "../Notes/SideNavBar/Sidebar";
import Notebook from "./Notebooks";
import "./Notebooks.css";
import Sidebar from "../SideNavBar/Sidebar";
function NotebookPage() {
  return (
    <div className="notebook-page">
      <Sidebar />
      <div className="notebook-container">
        <Notebook />
      </div>
    </div>
  );
}
export default NotebookPage;
