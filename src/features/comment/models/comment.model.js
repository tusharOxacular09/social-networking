import { generateRandomAlphaNumeric } from "../../../helpers/uniqueId.helper.js";
import { comments } from "../../../database/comment.collection.js";
import { posts } from "../../../database/post.collection.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

export default class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  // 1. Create a new comment
  static addComment(userId, postId, content) {
    try {
      // Check that the particular post exists
      const postIndex = posts.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        // Generate a unique comment ID
        const uniqueId = "comment-" + generateRandomAlphaNumeric(4);
        const newComment = new CommentModel(uniqueId, userId, postId, content);

        // Push the comment into the comments collection
        comments.push(newComment);

        return newComment;
      }

      return false;
    } catch (error) {
      console.error(error); // Log the actual error for debugging
      throw new customErrorHandler(400, "Error while adding new comment.");
    }
  }

  // 2. Get All comments by postid
  static getAllComment(postId) {
    const allComments = [];
    comments.map((comment) => {
      if (comment.postId === postId) {
        allComments.push(comment);
      }
    });
    return allComments;
  }

  // 3. Delete comment by id
  static deleteById(id) {
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) {
      throw new customErrorHandler(404, "Invalid comment id.");
    }
    comments.splice(commentIndex, 1);
  }

  // 4. Update comment by id
  static updateById(id, content) {
    const commentIndex = comments.findIndex((comment) => comment.id === id);
    if (commentIndex === -1) {
      throw new customErrorHandler(404, "Invalid comment id.");
    }
    // updating comments
    comments[commentIndex] = { ...comments[commentIndex], content };

    return comments[commentIndex];
  }
}
