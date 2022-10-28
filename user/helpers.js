import bcrypt from "bcrypt";
import { sha256 } from "js-sha256";

/**
 * Generate hash from input password and salt strings
 * @param {String} password
 * @param {String} salt
 * @returns hashed string
 */
export function hashPassword(password, salt) {
  return sha256(password + salt);
}

/**
 * Check if user password hash matches stored hash
 * @param {String} password
 * @param {String} salt
 * @param {String} storedHash
 * @returns
 */
export function comparePassword(password, salt, storedHash) {
  const genHash = hashPassword(password, salt);
  return genHash === storedHash;
}

/**
 * Generate salt for user
 * @returns salt string for user
 */
export async function genSalt() {
  return bcrypt.genSalt(10);
}

/**
 * Handle Mongo Duplicate Error
 * @param {Object} err error object
 * @param {Object} res response object
 */
export function handleDuplicateError(err, res) {
  const errorParams = Object.entries(err.keyValue)[0];
  const modelName = err.message.split(".")[1].split(" ")[0];
  return res.status(400).send({
    status: "error",
    message: `${modelName.slice(0, modelName.length - 1)} with ${
      errorParams[0]
    } "${errorParams[1]}" already exists`,
  });
}

/**
 * Create new object from user object containing only necessary fields
 * @param {Object} user user object
 * @returns pruned copy of user object
 */
export function getUserCopy(user) {
  const userCopy = { ...user.toObject() };
  delete userCopy.hash;
  delete userCopy.salt;
  return userCopy;
}
