import { NotAllowedError, NotFoundError } from "../../helpers/errors";
import { BoardModel, ColumnModel, TaskModel } from "../models";

export async function getBoards(payload) {
  const boards = await BoardModel.find({ user: payload.user.id });
  const cleanBoards = boards.map((board) => board.toObject());
  return cleanBoards;
}

export async function getSingleBoard(payload) {
  const { id, user } = payload;
  const board = await BoardModel.findById(id);
  if (!board) throw new NotFoundError("Board not found");
  if (board && board.user.toString() !== user.id)
    throw new NotAllowedError("Permission Denied");

  const columns = await ColumnModel.find({ board: board._id });
  return { ...board.toObject(), columns };
}

export async function createBoard(payload) {
  const { name, user, columns } = payload;
  const board = await BoardModel.create({ name, user: user.id });
  if (columns)
    await ColumnModel.create(
      columns.map(({ name }) => ({ name, board: board._id, user: user.id }))
    );
  return await getSingleBoard({ id: board._id, user });
}

export async function editBoard(payload) {
  const { id, ...rest } = payload;
  const board = await BoardModel.findByIdAndUpdate(id, rest, { new: true });
  return await getSingleBoard({ id: board._id, user });
}

export async function deleteBoard(payload) {
  const { id } = payload;
  await BoardModel.deleteOne({ _id: id });
  const relatedColumns = await ColumnModel.find({ board: id });
  relatedColumns.forEach((column) => {
    TaskModel.deleteMany({ status: column._id.toString() });
  });
  await ColumnModel.deleteMany({ board: id });
  return true;
}
