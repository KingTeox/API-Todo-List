import { model, Schema } from "mongoose";

const schemaTodo = new Schema({
    _id: { type: String, required: true },
    date: { type: String, required: true },
    message: { type: String, required: true }
});

export default model("todo-t", schemaTodo, "todo-collection");
