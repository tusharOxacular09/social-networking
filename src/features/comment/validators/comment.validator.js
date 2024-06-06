import { body, validationResult } from "express-validator";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

export const commentValidator = async (req, res, next) => {
  try {
    const validateUser = [
      body("content").trim().notEmpty().withMessage("Content is required"),
    ];

    // Ashynchronously running each validation
    await Promise.all(
      validateUser.map((field) => {
        return field.run(req);
      })
    );

    // Sending validation errors
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new customErrorHandler(400, validationErrors.array()[0].msg);
    }

    // If all fields are correct
    next();
  } catch (error) {
    next(error);
  }
};
