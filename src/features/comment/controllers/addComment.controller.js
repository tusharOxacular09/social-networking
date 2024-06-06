import CommentModel from "../models/comment.model.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

const addNewComment = (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;
  const content = req.body.content;
  if (!postId) {
    throw new customErrorHandler(400, "Post id is required.");
  }

  const addComment = CommentModel.addComment(userId, postId, content);

  if (!addComment) {
    throw new customErrorHandler(400, "Invalid post id.");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully added new comment.",
    data: addComment,
  });
};

export { addNewComment };
