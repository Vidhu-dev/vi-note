import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getNotebooks } from "../Redux/Features/notebookSlice";
import "./NewNoteModal.css";
import { createNote } from "../Redux/Features/noteSlice";
const initalState = {
  title: "",
  notebookId: "",
  color: ""
};
const colors = [
  {
    name: "red",
    value: "#EA5455",
  },
  {
    name: "yellow",
    value: "#F0EB8D",
  },
  {
    name: "blue",
    value: "#95BDFF",
  },
  {
    name: "sky",
    value: "#98DFD6",
  },
  {
    name: "gray",
    value: "#4E6E81",
  },
];
function NewNoteModal() {
  const [noteData, setNoteData] = useState(initalState);
  const { notebooks, loading } = useSelector((state) => ({
    ...state.notebook,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getNotebooks());
  }, []);
  const handelCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  console.log(notebooks);
  const handelSubmit = (e) => {
    e.preventDefault();
    if (noteData.title && noteData.notebookId) {
      dispatch(createNote({ noteData, navigate }));
    }
  };
  const handelChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };
  return (
    <div className="new-note-modal">
      <form className="new-note-modal-form" action="">
        <label htmlFor="">
          Title
          <input
            onChange={handelChange}
            className="new-note-modal-form-input"
            name="title"
            type="text"
            value={noteData.title}
          />
        </label>
        <label htmlFor="notebooks">
          Notebook
          <select
            onChange={handelChange}
            value={noteData.notebookId}
            className="new-note-modal-form-input"
            name="notebookId"
            id=""
          >
            <option value="null" selected>
              Select a Notebook
            </option>
            {notebooks.map(({ title, _id }, i) => {
              return (
                <option
                  key={i}
                  className="new-note-modal-form-input"
                  value={_id}
                >
                  {title}
                </option>
              );
            })}
          </select>
        </label>{" "}
        <label htmlFor="color">
          Color
          <select
            onChange={handelChange}
            className="new-note-modal-form-input"
            value={noteData.color}
            name="color"
          >
            <option value="null" selected>
              Select a Color
            </option>
            {colors.map((color, i) => {
              return (
                <option key={i} value={color.value}>
                  {color.name}
                </option>
              );
            })}
          </select>
        </label>
        <div className="new-note-modal-buttons">
          <input
            onClick={handelCancel}
            className="new-note-model-button"
            type="button"
            value="Cancel"
          />
          <input
            onClick={handelSubmit}
            className="new-note-model-button"
            type="button"
            value="Create"
          />
        </div>
      </form>
    </div>
  );
}

export default NewNoteModal;
