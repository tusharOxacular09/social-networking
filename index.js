import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import { welcomeMessageMiddleware } from "./src/middlewares/welcome.middleware.js";
import { userRouter } from "./src/features/user/routes/user.router.js";
import { postRouter } from "./src/features/post/routes/post.router.js";
import { authMiddleware } from "./src/middlewares/auth.middleware.js";
import { invalidRoutesHandlerMiddleware } from "./src/middlewares/invalidRoutes.middleware.js";
import { errorHandlerMiddleware } from "./src/middlewares/errorHandler.middleware.js";
import { commentRouter } from "./src/features/comment/routes/comment.route.js";
import { likeRouter } from "./src/features/like/routes/like.route.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/features/documentation/swagger.json' assert { type: 'json' };

const app = express();

// Global Middlewares
app.use(express.json());
app.use(cookieParser());

// Welcome message
app.get("/", welcomeMessageMiddleware);

// Routes
app.use("/api/user", userRouter);
app.use("/api/posts", authMiddleware, postRouter);
app.use("/api/comments", authMiddleware, commentRouter);
app.use("/api/likes", authMiddleware, likeRouter);

// Documentation Routes
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Invalid Route Middleware
app.use(invalidRoutesHandlerMiddleware);

// Error Handeler Middleware
app.use(errorHandlerMiddleware);

export default app;
