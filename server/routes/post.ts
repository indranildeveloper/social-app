import express from "express";
import auth from "../middlewares/authMiddleware";
import getPost from "../controllers/posts/post/getPost";
import getPosts from "../controllers/posts/post/getPosts";
import createPost from "../controllers/posts/post/createPost";
import updatePost from "../controllers/posts/post/updatePost";
import deletePost from "../controllers/posts/post/deletePost";
import createLike from "../controllers/posts/like/createLike";
import deleteLike from "../controllers/posts/like/deleteLike";

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
