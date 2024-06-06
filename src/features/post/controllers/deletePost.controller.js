import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import PostModel from "../models/post.model.js";

const deletePost = (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    throw new customErrorHandler(400, "Post id is required.");
  }

  // Deleting the post
  PostModel.deleteById(postId);

  return res.status(200).json({
    success: true,
    message: "Successfully deleted the post.",
  });
};

export { deletePost };
