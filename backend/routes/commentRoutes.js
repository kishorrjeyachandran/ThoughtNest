import express from "express";

import {
  createComment,
  getComments,
} from "../controllers/commentController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:postId")
  .get(getComments)
  .post(protect, createComment);

export default router;