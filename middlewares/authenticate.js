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
  if (!token) next(new AuthenticationError("Expected token"));

  try {
    const verified = jwt.verify(token, config.JWT_SECRET_KEY);
    const now = getCurrentTimeInSeconds();
    if (now > verified.exp) next(new AuthenticationError("Token expired"));
    req.user = verified;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError")
      next(new AuthenticationError("Invalid token"));
  }
}
