import { NotFoundError } from "../helpers/errors";

export function notFound(req, res, next) {
  next(new NotFoundError("No resource found"));
}
