import loggerMidddleware from "../middlewares/logger.middleware.js";

export class customErrorHandler extends Error {
  constructor(statusCode, errMessage) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  
  if (err instanceof customErrorHandler) {
    // 1. Log the error
    const errorLog = JSON.stringify({
      "request URL": req.url,
      "error message": err.message,
    });
    loggerMidddleware.error(errorLog);

    // 2. send appropriate message to client.
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // logging the error in console
  console.log(err);

  // For any un handeled errors return 500 as Internl Server Error.
  const errorLog = JSON.stringify({
    "request URL": req.url,
    "error message": "Internal Server Error",
  });
  loggerMidddleware.error(errorLog);

  return res.status(500).json({
    success: false,
    message: "Oops! Something went wrong... Please try again later!",
  });
};
