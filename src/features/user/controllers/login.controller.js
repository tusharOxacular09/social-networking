import { createToken } from "../../../helpers/tokenCreation.helper.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";
import UserModel from "../models/user.model.js";

const Login = (req, res) => {
  const { email, password } = req.body;
  const isValidUser = UserModel.validateUser(email, password);

  if (!isValidUser) {
    throw new customErrorHandler(401, "Invalid user credentials!");
  }

  // If user is a valid user, we have to make a jwt token and set it in users cookies.
  const token = createToken(isValidUser.id, isValidUser.name);

  // After Successful creation of token
  // Setting the token in browsers cookies
  res.cookie("secrete_token", token, { maxAge: 1000 * 60 * 60 });

  // After Successful Login send success message
  res.status(200).json({
    success: true,
    message: "Successfully Logged In.",
    token, // Sending the access token in response.
  });
};

export { Login };
