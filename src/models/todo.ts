import { model, Schema } from "mongoose";

const schemaTodo = new Schema({
    _id: { type: String, required: true },
    date: { type: Date, default: new Date() },
    message: { type: String, required: true }
});

export default model("todo-t", schemaTodo, "todo-collection");
