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
import createEducation from "../controllers/user/education/createEducation";
import deleteEducation from "../controllers/user/education/deleteEducation";
import createExperience from "../controllers/user/experience/createExperience";
import deleteExperience from "../controllers/user/experience/deleteExperience";

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

router.route("/user/:userId/profile/education").post(auth, createEducation);
router
  .route("/user/:userId/profile/education/:eduId")
  .delete(auth, deleteEducation);

router.route("/user/:userId/profile/experience").post(auth, createExperience);
router
  .route("/user/:userId/profile/experience/:expId")
  .delete(auth, deleteExperience);

export default router;
