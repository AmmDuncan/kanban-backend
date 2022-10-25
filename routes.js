import { Router } from "express";

import { boardsRouter, columnsRouter, tasksRouter } from "./kanban/routes";
import { authenticate } from "./middlewares/authenticate";
import { userRouter } from "./user/routes";

const apiRouter = Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/boards", authenticate, boardsRouter);
apiRouter.use("/columns", authenticate, columnsRouter);
apiRouter.use("/tasks", authenticate, tasksRouter);

export { apiRouter };
