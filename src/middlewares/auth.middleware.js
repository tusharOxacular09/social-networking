import { customErrorHandler } from "./errorHandler.middleware.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.secrete_token;

  if (!token) {
    return next(new customErrorHandler(401, "Please log in to continue."));
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
    if (err) {
      if (err instanceof jwt.TokenExpiredError) {
        return next(
          new customErrorHandler(401, "Token expired. Please log in again.")
        );
      } else {
        return next(
          new customErrorHandler(401, "Invalid token. Please log in again.")
        );
      }
    }

    req.userId = decoded.userId;
    req.userName = decoded.userName;

    next();
  });
};
