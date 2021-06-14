import mongoose from 'mongoose'
const { Model, Schema, model } = mongoose;

const monsterSchema = new Schema({
    type: String,
    hp: Number,
    atk: Number,
    armor: Number
})

export default monsterSchema;