import "./NotebookTemplate.css";
import { IonIcon } from "@ionic/react";
import { createOutline, bookmark } from "ionicons/icons";
import { useNavigate } from "react-router-dom";
function NotebookTemplate(notebook) {
  const navigate = useNavigate();
  const handelClick = (e) => {
    e.preventDefault();
    navigate(`/notebook/${notebook.id}`);
  };


  return (
    <div style= {{backgroundColor: `${notebook.color}`}}  onClick={handelClick} className="notebook-template">
      <IonIcon class="notebook-template-icon" icon={bookmark} />
      <div className="notebook-template-line"></div>
      <div className="notebook-template-top">
        <p>{notebook.name}</p>
        <IonIcon icon={createOutline} />
        
      </div>
      <div className="notebook-template-date">{notebook.date}</div>
    </div>
  );
}
export default NotebookTemplate;
