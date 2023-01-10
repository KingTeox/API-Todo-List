"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schemaTodo = new mongoose_1.Schema({
    _id: { type: String, required: true },
    date: { type: Date, default: new Date() },
    message: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)("todo-t", schemaTodo, "todo-collection");
