import { Router } from "express";
import { getAllCommentByPostId } from "../controllers/getAllComment.controller.js";
import { addNewComment } from "../controllers/addComment.controller.js";
import { commentValidator } from "../validators/comment.validator.js";
import { deleteComment } from "../controllers/deleteComment.controller.js";
import { updateComment } from "../controllers/updateComment.controller.js";

// Initializing Router
const commentRouter = Router();

commentRouter
  .get("/:id", getAllCommentByPostId)
  .post("/:id", commentValidator, addNewComment)
  .delete("/:id", deleteComment)
  .put("/:id", commentValidator, updateComment);

export { commentRouter };
