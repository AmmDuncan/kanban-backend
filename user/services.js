import jwt from "jsonwebtoken";

import { comparePassword, genSalt, getUserCopy, hashPassword } from "./helpers";
import { UserModel } from "./models";
import config from "../helpers/config";

export async function getUserByUsernameOrEmail(usernameOrEmail) {
  const $regex = RegExp(`^${usernameOrEmail}$`, "i");
  const usernameFilter = { username: { $regex } };
  const emailFilter = { email: { $regex } };
  return await UserModel.findOne({
    $or: [usernameFilter, emailFilter],
  }).exec();
}

export async function removeAllUsers() {
  return UserModel.deleteMany();
}

export async function createUserObject(options) {
  const { username, email, password } = options;
  const salt = await genSalt();
  const hash = hashPassword(password, salt);
  const user = await UserModel.create({
    username,
    email,
    salt,
    hash,
  });
  return getUserCopy(user);
}

export async function authenticateUser(options) {
  const { username, password } = options;
  const user = await getUserByUsernameOrEmail(username);
  if (!user) return null;

  const matches = comparePassword(password, user.salt, user.hash);
  if (!matches) return null;

  const userCopy = getUserCopy(user);
  const token = jwt.sign(userCopy, config.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });

  return { user: userCopy, token };
}
