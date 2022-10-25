import { Router } from "express";

import userControllers from "./controllers";
import { validateSchema } from "../middlewares/validate_schema";
import { createUserBodySchema, loginUserSchema } from "./validation";

const { createUser, login } = userControllers;

const userRouter = Router();

userRouter.post("/", validateSchema(createUserBodySchema), createUser);
userRouter.post("/login", validateSchema(loginUserSchema), login);

export { userRouter };
