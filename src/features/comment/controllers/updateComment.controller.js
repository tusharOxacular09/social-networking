import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import CommentModel from "../models/comment.model.js";

const updateComment = (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  if (!commentId) {
    throw new customErrorHandler(400, "Comment id is required.");
  }

  // Deleting the post
  const updatedComment = CommentModel.updateById(commentId, content);

  return res.status(200).json({
    success: true,
    message: "Successfully updated the comment.",
    data: updatedComment,
  });
};

export { updateComment };
