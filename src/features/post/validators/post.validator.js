import { body, validationResult } from "express-validator";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

export const postValidator = async (req, res, next) => {
  try {
    const validateUser = [
      body("caption").trim().notEmpty().withMessage("Caption is required"),
      body("postImage").custom((value, { req }) => {
        if (!req.file) {
          throw new Error("Post image is required");
        }
        return true;
      }),
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
