import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import PostModel from "../models/post.model.js";

const getPostByUserId = (req, res) => {
  const userId = req.userId;
   
  if (!userId) {
    throw new customErrorHandler(401, "Unauthorized user, please login.");
  }

  const posts = PostModel.findByUserId(userId);

  if (!posts || !posts.length) {
    throw new customErrorHandler(404, "No post provided by the user till.");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully retrived all posts of the user.",
    data: posts,
  });
};

export { getPostByUserId };
