import express from "express";
import auth from "../middlewares/authMiddleware";
import getPost from "../controllers/post/getPost";
import getPosts from "../controllers/post/getPosts";
import createPost from "../controllers/post/createPost";
import updatePost from "../controllers/post/updatePost";
import deletePost from "../controllers/post/deletePost";
import createLike from "../controllers/post/like/createLike";
import deleteLike from "../controllers/post/like/deleteLike";

const router = express.Router();

router.route("/post").get(auth, getPosts);
router.route("/post/:postId").get(auth, getPost);
router.route("/user/:userId/post").post(auth, createPost);

router
  .route("/user/:userId/post/:postId")
  .put(auth, updatePost)
  .delete(auth, deletePost);

router.route("/post/:postId/like").post(auth, createLike);
router.route("/post/:postId/unlike").post(auth, deleteLike);

export default router;
