import { model, Schema } from "mongoose";
import { schemaOptions } from "../helpers/utils";

const BoardSchema = new Schema(
  {
    name: { type: String, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    created_at: { type: Date, default: () => new Date() },
  },
  schemaOptions
);

const ColumnSchema = new Schema(
  {
    name: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    board: { type: Schema.Types.ObjectId, ref: "Board" },
  },
  schemaOptions
);

const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    subtasks: [{ title: String, done: Boolean }],
    status: { type: Schema.Types.ObjectId, ref: "Column" },
    board: { type: Schema.Types.ObjectId, ref: "Board" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    created_at: { type: Date, default: () => new Date() },
  },
  schemaOptions
);

const BoardModel = model("Board", BoardSchema);
const ColumnModel = model("Column", ColumnSchema);
const TaskModel = model("Task", TaskSchema);

export { BoardModel, ColumnModel, TaskModel };
