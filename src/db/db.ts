import exp from "constants";
import { link } from "fs";
import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

const ContentSchema = new Schema({
  type: {
    type: String,
    enum: ["document", "tweet", "youtube", "link"],
  },
  link: String,
  title: String,
  tags: [String],
  ref: { type: Schema.Types.ObjectId, ref: "User" },
});

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
