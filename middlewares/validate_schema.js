import { ValidationError } from "../helpers/errors";

export const validateSchema = (Schema) =>
  function (req, _res, next) {
    const { error } = Schema.validate(req.body);
    if (error) {
      throw new ValidationError(error.details[0].message);
    }
    next();
  };
