import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import PostModel from "../models/post.model.js";

const getPostById = (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    throw new customErrorHandler(400, "Post id is required.");
  }

  const post = PostModel.findById(postId);

  if (!post) {
    throw new customErrorHandler(404, "Invalid post id.");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully retrived desired post.",
    data: post,
  });
};

export { getPostById };
