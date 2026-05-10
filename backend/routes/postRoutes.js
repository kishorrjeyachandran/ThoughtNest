import express from "express";

import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
  searchPosts,
} from "../controllers/postController.js";
import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/search", searchPosts);

router.get("/my-posts", protect, getUserPosts);

router.route("/")
  .get(getPosts)
  .post(protect, createPost);

router.route("/:id")
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

export default router;