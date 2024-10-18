import "./Notebooks.css";
import NotebookTemplate from "./NotebookTemplate";
import { IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getNotebooks } from "../Redux/Features/notebookSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../Filter/Filter";
function Notebook() {
  const { notebooks, loading } = useSelector((state) => ({
    ...state.notebook,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);


  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="notebook">
      <p>Notebooks</p>
      <hr />
      <Filter/>
      <div className="notebook-gallery">
        {notebooks?.map((notebook) => (
          <NotebookTemplate
            id={notebook._id}
            name={notebook.title}
            date={notebook.createdAt}
            color = {notebook.color}
          />
        ))}
        <Link to="/addNotebook" className="note-gallery-add-note">
          <button id="add-new">
            <IonIcon id="add" icon={add} />
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Notebook;
