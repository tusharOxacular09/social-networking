import CommentModel from "../models/comment.model.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

const getAllCommentByPostId = (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    throw new customErrorHandler(400, "Post id is required.");
  }

  const allComments = CommentModel.getAllComment(postId);

  if (!allComments?.length) {
    throw new customErrorHandler(404, "No comments provided yet.");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully retrived all comments",
    data: allComments,
  });
};

export { getAllCommentByPostId };
