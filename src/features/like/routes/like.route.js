import { Router } from "express";
import { getAllLikesOfAPost } from "../controllers/getAllLikes.controller.js";
import { getAllToggeledLikesOfAPost } from "../controllers/getAllToggeledLikes.controller.js";
import { addANewLike } from "../controllers/addLike.controller.js";
import { postIdValidator } from "../validators/postIdCheck.validator.js";

// Initializing Router
const likeRouter = Router();

likeRouter
  .get("/:id", getAllLikesOfAPost)
  .get("/toggle/:id", getAllToggeledLikesOfAPost)
  .post("/:id", postIdValidator, addANewLike);

export { likeRouter };
