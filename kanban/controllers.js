import { autoCatch } from "../helpers/auto_catch";
import * as boardService from "./services/boards";
import * as columnService from "./services/columns";
import * as taskService from "./services/tasks";

/* BOARD */
async function getSingleBoard(req, res) {
  const board = await boardService.getSingleBoard({
    id: req.params.id,
    user: req.user,
  });
  return res.status(200).send({
    status: "success",
    data: {
      board,
    },
  });
}

async function getBoards(req, res) {
  const boards = await boardService.getBoards({ user: req.user });
  return res.status(200).send({
    status: "success",
    data: {
      boards,
    },
  });
}

async function createBoard(req, res) {
  const board = await boardService.createBoard({ ...req.body, user: req.user });
  return res.status(201).send({
    status: "success",
    message: "Board created successfully",
    data: {
      board,
    },
  });
}

async function editBoard(req, res) {
  const board = await boardService.editBoard({
    ...req.body,
    id: req.params.id,
  });
  return res.status(200).send({
    status: "success",
    message: "Board edited successfully",
    data: {
      board,
    },
  });
}

async function deleteBoard(req, res) {
  await boardService.deleteBoard({ ...req.params });
  return res.status(200).send({
    status: "success",
    message: "Board deleted successfully",
  });
}

/* COLUMN */
async function getColumns(req, res) {
  const columns = await columnService.getColumns(req);
  return res.status(200).send({
    status: "success",
    data: {
      columns,
    },
  });
}

async function createColumn(req, res) {
  const column = await columnService.createColumn({
    ...req.body,
    user: req.user,
  });
  return res.status(201).send({
    status: "success",
    data: {
      column,
    },
  });
}

async function editColumn(req, res) {
  const column = await columnService.editColumn({
    ...req.body,
    id: req.params.id,
  });
  return res.status(200).send({
    status: "success",
    message: "Column edited successfully",
    data: {
      column,
    },
  });
}

async function deleteColumn(req, res) {
  await columnService.deleteColumn({ ...req.params });
  return res.status(200).send({
    status: "success",
    message: "Column deleted successfully",
  });
}

/* TASK */
async function createTask(req, res) {
  const task = await taskService.createTask({ ...req.body, user: req.user });
  return res.status(201).send({
    status: "success",
    message: "Task created successfully",
    data: {
      task,
    },
  });
}

async function editTask(req, res) {
  const updatedTask = await taskService.editTask({
    ...req.body,
    ...req.params,
    user: req.user,
  });
  return res.status(200).send({
    status: "success",
    message: "Task edited successfully",
    data: {
      task: updatedTask,
    },
  });
}

async function getTasks(req, res) {
  const tasks = await taskService.getTasks(req);
  return res.status(200).send({
    status: "success",
    data: {
      tasks,
    },
  });
}

async function deleteTask(req, res) {
  await taskService.deleteTask({ ...req.params });
  return res.status(200).send({
    status: "success",
    message: "Task deleted successfully",
  });
}

export default autoCatch({
  // Board
  getSingleBoard,
  getBoards,
  createBoard,
  editBoard,
  deleteBoard,
  // Column
  getColumns,
  createColumn,
  editColumn,
  deleteColumn,
  // Task
  createTask,
  editTask,
  getTasks,
  deleteTask,
});
