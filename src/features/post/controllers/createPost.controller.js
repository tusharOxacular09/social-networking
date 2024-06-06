import PostModel from "../models/post.model.js";

const createPost = (req, res) => {
  const { caption } = req.body;
  const userId = req.userId;
  const imageUrl = req.imageUrl;

  const createNewPost = PostModel.createPost(userId, caption, imageUrl);

  return res.status(200).json({
    success: true,
    message: "Successfully created new post.",
    data: createNewPost,
  });
};

export { createPost };
