import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Notes from "../Notes/Notes";
import { getNotebook } from "../Redux/Features/notebookSlice";
import Sidebar from "../SideNavBar/Sidebar";
import "./SingleNotebook.css";
function SingleNotebook() {
  const dispatch = useDispatch();
  const { notebook } = useSelector((state) => ({ ...state.notebook }));
  const { notebookId } = useParams();
  useEffect(() => {
    if (notebookId) {
      dispatch(getNotebook(notebookId));
    }
  }, [notebookId]);

  return (
    <div className="single-notebook">
      <Sidebar />
      <div
        style={{ borderColor: `${notebook.color}` }}
        className="single-notebook-container"
      >
        <h1>{notebook.title}</h1>
        <p>
          Created at:{" "}
          <span className="single-notebook-container-date">
            {new Date(notebook.createdAt).toLocaleString()}
          </span>
        </p>
        <p>{notebook.description}</p>
        <Notes notebookId={notebookId} />
      </div>
    </div>
  );
}

export default SingleNotebook;
