import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import LikeModel from "../models/like.model.js";

const getAllToggeledLikesOfAPost = (req, res) => {
  const postId = req.params.id;

  if (!postId) {
    throw new customErrorHandler(400, "Post id is required.");
  }

  const allLikes = LikeModel.getAllToggledLikes(postId);

  if (!allLikes?.length) {
    throw new customErrorHandler(404, "No likes provided yet.");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully retrived all toggeled likes",
    data: allLikes,
  });
};

export { getAllToggeledLikesOfAPost };
