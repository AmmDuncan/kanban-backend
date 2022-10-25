export class ValidationError extends Error {
  code = 1;
}

export class NotFoundError extends Error {
  code = 2;
}

export class AuthenticationError extends Error {
  code = 3;
}

export class NotAllowedError extends Error {
  code = 4;
}
