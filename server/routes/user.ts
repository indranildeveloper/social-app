import express from "express";
import auth from "../middlewares/authMiddleware";
import getUser from "../controllers/user/users/getUser";
import getUsers from "../controllers/user/users/getUsers";
import deleteUser from "../controllers/user/users/deleteUser";
import updateUser from "../controllers/user/users/updateUser";

const router = express.Router();

// User Routes
router
  .route("/user/:userId")
  .get(auth, getUser)
  .delete(auth, deleteUser)
  .put(auth, updateUser);
router.route("/users").get(auth, getUsers);

export default router;
