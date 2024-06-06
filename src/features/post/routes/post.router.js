import { Router } from "express";
import { createPost } from "../controllers/createPost.controller.js";
import { getAllPost } from "../controllers/getAllPost.controller.js";
import { getPostById } from "../controllers/getPostById.controller.js";
import { getPostByUserId } from "../controllers/getPostByUserId.js";
import { fileUploadMiddleware } from "../../../middlewares/fileUpload.middleware.js";
import { postValidator } from "../validators/post.validator.js";
import { deletePost } from "../controllers/deletePost.controller.js";
import { updatePost } from "../controllers/updatePost.controller.js";

// Initializing Router
const postRouter = Router();

postRouter
  .post(
    "/",
    fileUploadMiddleware.single("postImage"),
    postValidator,
    createPost
  )
  .get("/all", getAllPost)
  .get("/:id", getPostById)
  .get("/", getPostByUserId)
  .delete("/:id", deletePost)
  .put("/:id", fileUploadMiddleware.single("postImage"), updatePost);

export { postRouter };
