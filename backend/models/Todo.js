import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
    task: String,
    checkbox: {type: Boolean, default: false},
})
export const TodoModel = model("TodoModel", TodoSchema)