import { handleDuplicateError } from "../user/helpers";

export function errorHandler(err, req, res, next) {
  if (!err) return next();
  console.log(err);
  switch (err.code) {
    case 1:
      return res.status(400).send({ status: "error", message: err.message });
    case 2:
      return res.status(404).send({ status: "error", message: err.message });
    case 3:
      return res.status(401).send({ status: "error", message: err.message });
    case 4:
      return res.status(403).send({ status: "error", message: err.message });
    case 11000:
      return handleDuplicateError(err, res);
    default:
      return res.status(500).send({
        status: "error",
        message: "Something unnexpected occurred on the server",
      });
  }
}
