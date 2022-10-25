import { ValidationError } from "../../helpers/errors";
import { BoardModel, ColumnModel, TaskModel } from "../models";

export async function createColumn(payload) {
  const { name, user, board } = payload;
  const boardExists = await BoardModel.findOne({ _id: board, user: user.id });
  if (!boardExists) throw new ValidationError("Board does not exist");
  const columnExistsOnBoard = await ColumnModel.findOne({ name, board });
  console.log(columnExistsOnBoard);
  if (columnExistsOnBoard)
    throw new ValidationError(
      `column with name "${name}" exists on board "${boardExists.name}"`
    );
  const column = await ColumnModel.create({ name, board, user: user.id });
  return column.toObject();
}

export async function editColumn(payload) {
  const { id, ...rest } = payload;
  const column = await ColumnModel.findByIdAndUpdate(id, rest, { new: true });
  return column.toObject();
}

export async function getColumns(payload) {
  const { board } = payload.query;
  const boardFilter = board ? { board } : {};
  const columns = await ColumnModel.find({
    user: payload.user.id,
    ...boardFilter,
  });
  const cleanColumns = columns.map((col) => col.toObject());
  return cleanColumns;
}

export async function deleteColumn(payload) {
  const { id } = payload;
  await ColumnModel.deleteOne({ _id: id });
  await TaskModel.deleteMany({ status: id });
  return true;
}
