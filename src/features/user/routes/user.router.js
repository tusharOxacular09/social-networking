import { Router } from "express";
import { Login } from "../controllers/login.controller.js";
import { loginValidator } from "../validators/login.validator.js";
import { Register } from "../controllers/register.controller.js";
import { registerValidator } from "../validators/register.validator.js";

// Initializing Router
const userRouter = Router();

userRouter
  .post("/login", loginValidator, Login)
  .post("/register", registerValidator, Register);

export { userRouter };
