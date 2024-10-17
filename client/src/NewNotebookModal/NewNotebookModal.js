import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../NewNoteModal/NewNoteModal";
import { useDispatch, useSelector } from "react-redux";
import { createNotebook } from "../Redux/Features/notebookSlice";
import toast from "react-hot-toast";
const initialState = {
  title: "",
  description: "",
  color: "",
  createdAt: "",
};
function NewNotebookModal() {
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
  const { error, loading } = useSelector((state) => ({ ...state.notebook }));
  useEffect(() => {
    error && toast.error(error);
  }, [error]);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notebookData, setNotebookData] = useState(initialState);
  const { title, description, color } = notebookData;
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNotebookData({ ...notebookData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      dispatch(createNotebook({ notebookData, navigate }));
    }
  };
  const handelCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="new-note-modal">
      <form className="new-note-modal-form" action="">
        <label htmlFor="">
          Title
          <input
            className="new-note-modal-form-input"
            name="title"
            type="text"
            value={title}
            onChange={onInputChange}
          />
        </label>

        <label htmlFor="">
          Description
          <input
            className="new-note-modal-form-input"
            type="text"
            name="description"
            id=""
            value={description}
            onChange={onInputChange}
          />
        </label>
        <label htmlFor="color">
          Color
          <select
            onChange= {onInputChange}
            className="new-note-modal-form-input"
            value={color}
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
            onClick={handleSubmit}
            className="new-note-model-button"
            type="button"
            value="Create"
          />
        </div>
      </form>
    </div>
  );
}

export default NewNotebookModal;
