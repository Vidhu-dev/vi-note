import express from "express";
import { signin, signup, tokenValidation } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/isTokenvalid", tokenValidation);

export default router;
