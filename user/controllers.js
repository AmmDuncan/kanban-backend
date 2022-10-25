import { autoCatch } from "../helpers/auto_catch";
import { authenticateUser, createUserObject } from "./services";
import { AuthenticationError } from "../helpers/errors";

async function createUser(req, res) {
  const user = await createUserObject(req.body);
  res.status(201);
  res.send({
    status: "success",
    message: "User Created Successfully",
    data: { user },
  });
}

async function login(req, res) {
  const userData = await authenticateUser(req.body);
  if (!userData) throw new AuthenticationError("Incorrect login details");
  res.status(200);
  res.send({
    status: "success",
    message: "User authenticated",
    data: userData,
  });
}

export default autoCatch({ createUser, login });
