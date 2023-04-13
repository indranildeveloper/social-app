import express from "express";
import auth from "../middlewares/authMiddleware";
import createProfile from "../controllers/user/profile/createProfile";
import getProfile from "../controllers/user/profile/getProfile";
import updateProfile from "../controllers/user/profile/updateProfile";
import deleteProfile from "../controllers/user/profile/deleteProfile";

const router = express.Router();

// Profile routes
router
  .route("/user/:userId/profile")
  .get(getProfile)
  .post(auth, createProfile)
  .put(auth, updateProfile)
  .delete(auth, deleteProfile);

export default router;
