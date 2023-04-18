import express from "express";
import auth from "../middlewares/authMiddleware";
import getPost from "../controllers/post/getPost";
import getPosts from "../controllers/post/getPosts";
import createPost from "../controllers/post/createPost";
import updatePost from "../controllers/post/updatePost";
import deletePost from "../controllers/post/deletePost";

const router = express.Router();

router.route("/user/:userId/post").get(auth, getPosts).post(auth, createPost);

router
  .route("/user/:userId/post/:postId")
  .get(auth, getPost)
  .put(auth, updatePost)
  .delete(auth, deletePost);

export default router;
