import express from "express";
import registerController from "../controllers/auth/registerController";

const router = express.Router();

// Auth Routes
router.post("/register", registerController);

export default router;
