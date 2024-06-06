import { users } from "../../../database/user.collection.js";
import { generateRandomAlphaNumeric } from "../../../helpers/uniqueId.helper.js";
import { customErrorHandler } from "../../../middlewares/errorHandler.middleware.js";

export default class UserModel {
  static createUser(user) {
    // Validate the user parameter
    if (!user || typeof user !== "object") {
      throw new customErrorHandler(400, "Invalid user object");
    }

    // Creating unique Id for the user
    const uniqueId = "user-" + generateRandomAlphaNumeric(4);

    // Add the user to the users array
    users.push({
      id: uniqueId,
      ...user,
    });
  }

  static validateUser(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return { id: user.id, name: user.name };
    }
    return false;
  }
}
