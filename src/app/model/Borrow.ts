import { model, Schema } from "mongoose";
import { borrowInterface } from "../interface/borrowInterface";
import { Book } from "./Books";

const borrowSchema = new Schema<borrowInterface>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true, min: 1 }, 
    dueDate: { type: Date, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

borrowSchema.pre("save", async function (next) {
  const borrow = this;
  try {
    const book = await Book.findById(borrow.book);
    
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
    
    await book.save();
    next();
  } catch (error: any) {
    next(error); // এররটি next() এর মাধ্যমে পাস করি
  }
});

export const Borrow = model<borrowInterface>("Borrow", borrowSchema);