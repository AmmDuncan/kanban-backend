import { model, Schema } from "mongoose";
import { transformModel } from "../helpers/utils";

const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    hash: String,
    salt: String,
  },
  {
    toObject: transformModel,
    toJSON: transformModel,
  }
);

const UserModel = model("User", UserSchema);

export { UserModel };
