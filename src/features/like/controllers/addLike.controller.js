import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import LikeModel from "../models/like.model.js";

const addANewLike = (req, res) => {
  const postId = req.params.id;
  const userId = req.userId;

  const addLike = LikeModel.addALike(userId, postId);

  if (!addLike) {
    throw new customErrorHandler(400, "Error while adding the like.");
  }

  return res.status(200).json({
    success: true,
    message: "Successfully added the likes",
    data: addLike,
  });
};

export { addANewLike };
