import mongoose from 'mongoose'
const { Model, Schema, model } = mongoose;

const tileSchema = new Schema({
    type: String,
    monster: {type: Schema.Types.ObjectId, ref: 'Monster'}
})

export default tileSchema