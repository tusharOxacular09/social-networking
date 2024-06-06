import { generateRandomAlphaNumeric } from "../../../helpers/uniqueId.helper.js";
import { posts } from "../../../database/post.collection.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import { paginate } from "../../../helpers/pagination.helper.js";

export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }

  // 1. Create a new post
  static createPost(userId, caption, imageUrl) {
    try {
      // Generating an unique post ID.
      const uniqueId = "post-" + generateRandomAlphaNumeric(4);
      const newPost = new PostModel(uniqueId, userId, caption, imageUrl);

      // Pushing the post into the post collection
      posts.push(newPost);

      return newPost;
    } catch (error) {
      throw new customErrorHandler(400, "Error while creating post.");
    }
  }

  // 2. Get All Posts
  static getAllPost(page, limit) {
    return paginate(posts, page, limit);
  }

  // 3. Get by post id
  static findById(id) {
    const post = posts.find((post) => post.id === id);
    if (!post) {
      throw new customErrorHandler(404, "Invalid post id.");
    }
    return post;
  }

  // 4. Get by user id
  static findByUserId(id) {
    const allPosts = [];
    posts.map((post) => {
      if (post.userId === id) {
        allPosts.push(post);
      }
    });
    return allPosts;
  }

  // 5. Delete post by id
  static deleteById(id) {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new customErrorHandler(404, "Invalid post id.");
    }
    posts.splice(postIndex, 1);
  }

  // 6. Update post by id
  static updateById(id, data) {
    const postIndex = posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new customErrorHandler(404, "Invalid post id.");
    }
    // updating posts
    posts[postIndex] = { ...posts[postIndex], ...data };
  }
}
