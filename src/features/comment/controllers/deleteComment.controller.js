import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import CommentModel from "../models/comment.model.js";

const deleteComment = (req, res) => {
  const commentId = req.params.id;
  if (!commentId) {
    throw new customErrorHandler(400, "Comment id is required.");
  }

  // Deleting the post
  CommentModel.deleteById(commentId);

  return res.status(200).json({
    success: true,
    message: "Successfully deleted the comment.",
  });
};

export { deleteComment };
