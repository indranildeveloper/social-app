import express from "express";
import auth from "../middlewares/authMiddleware";
import createProfile from "../controllers/user/profile/createProfile";
import getProfile from "../controllers/user/profile/getProfile";
import updateProfile from "../controllers/user/profile/updateProfile";
import deleteProfile from "../controllers/user/profile/deleteProfile";
import createOrUpdateAddress from "../controllers/user/address/createOrUpdateAddress";
import deleteAddress from "../controllers/user/address/deleteAddress";
import createOrUpdateSocials from "../controllers/user/socials/createOrUpdateSocials";
import deleteSocials from "../controllers/user/socials/deleteSocials";

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
  .post(auth, createOrUpdateAddress)
  .put(auth, createOrUpdateAddress)
  .delete(auth, deleteAddress);

router
  .route("/user/:userId/profile/socials")
  .post(auth, createOrUpdateSocials)
  .put(auth, createOrUpdateSocials)
  .delete(auth, deleteSocials);

export default router;
