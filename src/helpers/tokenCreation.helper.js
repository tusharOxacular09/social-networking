import jwt from "jsonwebtoken";
import { customErrorHandler } from "../middlewares/errorHandler.middleware.js";

export const createToken = (id, name) => {
  try {
    const token = jwt.sign(
      { userId: id, userName: name },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    // If any Internal server error.
    // Handeling error by error handeler.
    throw new customErrorHandler(500, error.message);
  }
};
