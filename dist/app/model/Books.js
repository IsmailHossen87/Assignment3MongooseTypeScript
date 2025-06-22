"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const booksModel = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, enum: ["FICTION", "FICTION", "BIOGRAPHY", "HISTORY", "SCIENCE", "FANTASY"], required: true },
    available: { type: Boolean },
    copies: { type: Number, required: true, min: 0 },
    description: { type: String },
    isbn: { type: String, required: true, unique: true },
}, {
    versionKey: false,
    timestamps: true
});
exports.Book = (0, mongoose_1.model)("Book", booksModel);
