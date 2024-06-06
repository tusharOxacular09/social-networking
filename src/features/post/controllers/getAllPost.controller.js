import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import PostModel from "../models/post.model.js";

const getAllPost = (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const allPosts = PostModel.getAllPost(page, limit);

  if (!allPosts?.length) {
    throw new customErrorHandler(404, "No post provided yet.");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully retrived all posts",
    data: allPosts,
  });
};

export { getAllPost };
