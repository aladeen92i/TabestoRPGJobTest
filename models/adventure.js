import mongoose from "mongoose";
const { Model, Schema, model } = mongoose;
import eventSchema from "./event.js"

const adventureSchema = new Schema({
  tile_active: { type: Schema.Types.ObjectId, ref: "Tile" },
  score: { type: Number, default: 0 },
  rpgEvents: [eventSchema],
});

export default adventureSchema;