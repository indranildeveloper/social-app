import express from "express";
import registerController from "../controllers/auth/registerController";
import refreshTokenController from "../controllers/auth/refreshTokenController";
import loginController from "../controllers/auth/loginController";
import logoutController from "../controllers/auth/logoutController";

const router = express.Router();

// Auth Routes
router.post("/register", registerController);
router.post("/refresh", refreshTokenController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
