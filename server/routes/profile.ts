import express from "express";
import auth from "../middlewares/authMiddleware";
import createProfile from "../controllers/user/profile/createProfile";

const router = express.Router();

// Profile routes
router.route("/user/:userId/profile").post(auth, createProfile);

export default router;
