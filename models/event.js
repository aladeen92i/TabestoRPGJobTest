import mongoose from "mongoose";
const { Model, Schema, model } = mongoose;

const eventSchema = new Schema({
  characterAction: String,
  consequences: String,
});

export default eventSchema;
