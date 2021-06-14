import mongoose from "mongoose";
const { Model, Schema, model } = mongoose;

const characterSchema = new Schema({
  name: String,
  hp: { type: Number, default: 20 },
  atk: Number,
  armor: { type: Number, default: 5 },
  adventureId: { type: Schema.Types.ObjectId, ref: "Adventure" },
});

export default characterSchema;
