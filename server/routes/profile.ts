import express from "express";
import auth from "../middlewares/authMiddleware";
import createProfile from "../controllers/user/profile/createProfile";
import getProfile from "../controllers/user/profile/getProfile";
import updateProfile from "../controllers/user/profile/updateProfile";
import deleteProfile from "../controllers/user/profile/deleteProfile";
import createAddress from "../controllers/user/address/createAddress";
import updateAddress from "../controllers/user/address/updateAddress";
import deleteAddress from "../controllers/user/address/deleteAddress";

const router = express.Router();

// Profile routes
router
  .route("/user/:userId/profile")
  .get(getProfile)
  .post(auth, createProfile)
  .put(auth, updateProfile)
  .delete(auth, deleteProfile);

router
  .route("/user/:userId/profile/address")
  .post(auth, createAddress)
  .put(auth, updateAddress)
  .delete(auth, deleteAddress);

export default router;
