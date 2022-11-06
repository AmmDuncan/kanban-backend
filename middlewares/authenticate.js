import jwt from "jsonwebtoken";
import config from "../helpers/config";
import { AuthenticationError } from "../helpers/errors";

function extractToken(str) {
  const tokenPattern = /([bB]earer\s)?(?<token>.+)/;
  const match = str.match(tokenPattern);
  const { token } = match ? match.groups : {};
  return token;
}

function getCurrentTimeInSeconds() {
  return new Date().getTime() / 1000;
}

export async function authenticate(req, res, next) {
  let authHeader = req.headers["authorization"];
  if (!authHeader) authHeader = req.headers["Authorization"];
  authHeader = authHeader || "";
  const token = extractToken(authHeader);
  if (!token) return next(new AuthenticationError("Expected token"));

  try {
    const verified = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = verified;
    return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      return next(new AuthenticationError("Invalid token"));
    else if (err.name === "TokenExpiredError")
      return next(new AuthenticationError("Token expired"));
  }
}
