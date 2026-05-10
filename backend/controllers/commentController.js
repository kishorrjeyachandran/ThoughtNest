import Comment from "../models/Comment.js";


// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      text,
      user: req.user._id,
      post: req.params.postId,
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate("user", "name");

    res.status(201).json(populatedComment);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET COMMENTS
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};