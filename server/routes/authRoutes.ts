import express from "express";
import register from "../controllers/auth/register";
import refresh from "../controllers/auth/refreshToken";
import login from "../controllers/auth/login";
import logout from "../controllers/auth/logout";

const router = express.Router();

// Auth Routes
router.post("/register", register);
router.post("/refresh", refresh);
router.post("/login", login);
router.post("/logout", logout);

export default router;
