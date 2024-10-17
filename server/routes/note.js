import express from "express";
import {
  createNote,
  getNotes,
  getNotesByNotebook,
  getNote,
  updateNote,
} from "../controllers/note.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, createNote);
router.post("/update/:id", auth, updateNote);
router.get("/", auth, getNotes);
router.get("/:id", auth, getNote);
router.get("/notebook/:id", auth, getNotesByNotebook);
export default router;
