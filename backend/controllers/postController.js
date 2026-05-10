import Post from "../models/Post.js";


// CREATE POST
export const createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      coverImage,
      isDraft,
    } = req.body;

    const post = await Post.create({
      title,
      content,
      coverImage,
      isDraft,
      author: req.user._id,
    });

    res.status(201).json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL POSTS
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({
  isDraft: false,
})
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE POST
export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name");

    res.json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE POST
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // OWNER CHECK
    if (
      post.author.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    post.title =
      req.body.title || post.title;

    post.content =
      req.body.content || post.content;

    post.coverImage =
      req.body.coverImage ||
      post.coverImage;

    const updatedPost =
      await post.save();

    res.json(updatedPost);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE POST
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // OWNER CHECK
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await post.deleteOne();

    res.json({
      message: "Post deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            {
              title: {
                $regex: req.query.search,
                $options: "i",
              },
            },
            {
              content: {
                $regex: req.query.search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const posts = await Post.find(keyword)
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};