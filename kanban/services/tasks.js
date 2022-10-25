import { TaskModel } from "../models";

export async function createTask(payload) {
  const { title, description, subtasks, board, status, user } = payload;
  const task = await TaskModel.create({
    title,
    description,
    subtasks,
    status,
    board,
    user: user.id,
  });
  return task.toObject();
}

export async function editTask(payload) {
  const { id, user, ...rest } = payload;
  const task = await TaskModel.findByIdAndUpdate(
    id,
    { ...rest, user: user.id },
    { new: true }
  );
  return task.toObject();
}

export async function getTasks(payload) {
  const { board, column: status } = payload.query;
  const boardFilter = board ? { board } : {};
  const statusFilter = status ? { status } : {};
  const tasks = await TaskModel.find({
    user: payload.user.id,
    ...boardFilter,
    ...statusFilter,
  });
  const cleanTasks = tasks.map((col) => col.toObject());
  return cleanTasks;
}

export async function deleteTask(payload) {
  const { id } = payload;
  await TaskModel.findByIdAndDelete(id);
}
