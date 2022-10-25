import { Router } from "express";
import { validateSchema } from "../middlewares/validate_schema";
import kanbanControllers from "./controllers";
import {
  createBoardSchema,
  createColumnSchema,
  createTaskSchema,
  editBoardSchema,
  editColumnSchema,
  editTaskSchema,
} from "./validation";

const {
  getSingleBoard,
  getBoards,
  getColumns,
  createBoard,
  deleteBoard,
  createColumn,
  editColumn,
  editBoard,
  editTask,
  deleteColumn,
  createTask,
  getTasks,
  deleteTask,
} = kanbanControllers;

const boardsRouter = Router();
const columnsRouter = Router();
const tasksRouter = Router();

boardsRouter.get("/", getBoards);
boardsRouter.post("/", validateSchema(createBoardSchema), createBoard);
boardsRouter.get("/:id", getSingleBoard);
boardsRouter.put("/:id", validateSchema(editBoardSchema), editBoard);
boardsRouter.delete("/:id", deleteBoard);

columnsRouter.get("/", getColumns);
columnsRouter.post("/", validateSchema(createColumnSchema), createColumn);
columnsRouter.put("/:id", validateSchema(editColumnSchema), editColumn);
columnsRouter.delete("/:id", deleteColumn);

tasksRouter.post("/", validateSchema(createTaskSchema), createTask);
tasksRouter.put("/:id", validateSchema(editTaskSchema), editTask);
tasksRouter.get("/", getTasks);
tasksRouter.delete("/:id", deleteTask);

export { boardsRouter, columnsRouter, tasksRouter };
