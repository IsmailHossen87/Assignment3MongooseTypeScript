"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const Books_1 = require("../model/Books");
exports.booksRoute = express_1.default.Router();
// Post Books
exports.booksRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Books_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
// Get All Books
exports.booksRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userGenre = req.query.genre;
        let allBooks;
        if (userGenre) {
            allBooks = yield Books_1.Book.find({ genre: userGenre });
        }
        else {
            allBooks = yield Books_1.Book.find().sort({ createdAt: 1 }).limit(10);
        }
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
            error,
        });
    }
}));
// Get Single Book by Id
exports.booksRoute.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield Books_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.json({
            success: true,
            message: "Books retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
            error,
        });
    }
}));
// Book Update
exports.booksRoute.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const UpdateData = req.body;
        const updateBook = yield Books_1.Book.findByIdAndUpdate(bookId, UpdateData, {
            new: true,
            runValidators: true,
        });
        if (!updateBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.json({
            success: true,
            message: "Book updated successfully",
            data: updateBook,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
            error,
        });
    }
}));
// Book Delete
exports.booksRoute.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const deleteBook = yield Books_1.Book.findByIdAndDelete(bookId);
        if (!deleteBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.json({
            success: true,
            message: "Book Deleted successfully",
            data: deleteBook,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server error",
            success: false,
            error,
        });
    }
}));
