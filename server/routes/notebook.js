import express from "express";
import {
  createNotebook,
  getNotebooks,
  getNotebook,
} from "../controllers/notebook.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/",auth, createNotebook);
router.get("/", auth, getNotebooks);
router.get("/:id",auth, getNotebook);
export default router;
