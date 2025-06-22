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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const Books_1 = require("./Books");
const borrowSchema = new mongoose_1.Schema({
    book: { type: mongoose_1.Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
}, {
    versionKey: false,
    timestamps: true,
});
borrowSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const borrow = this;
        try {
            const book = yield Books_1.Book.findById(borrow.book);
            if (!book) {
                throw new Error("Book not found");
            }
            // কপি পর্যাপ্ত আছে কিনা চেক
            if (book.copies < borrow.quantity) {
                throw new Error(`Not enough copies available. Only ${book.copies} copies left`);
            }
            // কপি আপডেট করি
            book.copies -= borrow.quantity;
            book.available = book.copies > 0;
            yield book.save();
            next();
        }
        catch (error) {
            next(error); // এররটি next() এর মাধ্যমে পাস করি
        }
    });
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
