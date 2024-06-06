import UserModel from "../models/user.model.js";

const Register = (req, res) => {
  const { name } = req.body;

  // creating an user
  UserModel.createUser(req.body);

  // After Successful user creation
  res.status(201).json({
    success: true,
    message: `Hello ${name}, Your account has been successfully created.`,
  });
};

export { Register };
