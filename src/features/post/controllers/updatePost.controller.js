import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import PostModel from "../models/post.model.js";

const updatePost = (req, res) => {
  const postId = req.params.id;
  const caption = req.body.caption;
  const imageUrl = req.imageUrl;
  if (!postId) {
    throw new customErrorHandler(400, "Post id is required.");
  }

  // Deleting the post
  const updatedPost = PostModel.updateById(postId, { caption, imageUrl });

  return res.status(200).json({
    success: true,
    message: "Successfully updated the post.",
    data: updatedPost,
  });
};

export { updatePost };
