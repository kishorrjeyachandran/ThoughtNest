import express from "express";

import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getUserPosts,
  searchPosts,
  getDraftPosts,
} from "../controllers/postController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// SEARCH
router.get(
  "/search",
  searchPosts
);

// DRAFTS
router.get(
  "/drafts",
  protect,
  getDraftPosts
);

// USER POSTS
router.get(
  "/my-posts",
  protect,
  getUserPosts
);

// ALL POSTS + CREATE
router
  .route("/")
  .get(getPosts)
  .post(
    protect,
    createPost
  );

// SINGLE POST
router
  .route("/:id")
  .get(getPost)
  .put(
    protect,
    updatePost
  )
  .delete(
    protect,
    deletePost
  );

export default router;