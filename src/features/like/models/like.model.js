import { generateRandomAlphaNumeric } from "../../../helpers/uniqueId.helper.js";
import { likes } from "../../../database/like.collection.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

export default class LikeModel {
  constructor(id, userId, postId, isLiked) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.isLiked = isLiked;
  }

  // 1. Get All Likes
  static getAllLikes(postId) {
    const allLikes = [];
    // Retriving likes
    likes.map((like) => {
      if (like.postId === postId) {
        allLikes.push(like);
      }
    });
    return allLikes;
  }

  // 2. Toggle a like
  static getAllToggledLikes(postId) {
    const allLikes = [];
    // Retriving likes
    likes.map((like) => {
      // like.isLiked specifies that post is liked or not
      if (like.postId === postId && like.isLiked) {
        allLikes.push(like);
      }
    });
    return allLikes;
  }

  // Add a new like
  static addALike(userId, postId) {
    try {
      // Generating an unique post ID.
      const uniqueId = "like-" + generateRandomAlphaNumeric(4);
      const newLike = new LikeModel(uniqueId, userId, postId, true);

      // Pushing the post into the post collection
      likes.push(newLike);

      return newLike;
    } catch (error) {
      throw new customErrorHandler(400, "Error while addinfg new like.");
    }
  }
}
