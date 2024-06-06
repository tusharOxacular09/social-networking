import { posts } from "../../../database/post.collection.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

export const postIdValidator = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw new customErrorHandler(400, "Post id is required.");
    }
    const findPost = posts.findIndex((post) => post.id === postId);

    if (findPost === -1) {
      throw new customErrorHandler(404, "Invalid Post ID.");
    }

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};
