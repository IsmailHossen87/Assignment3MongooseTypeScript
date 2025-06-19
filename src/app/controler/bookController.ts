import express, { Request, Response } from "express";
import { Books } from "../model/Books";
export const booksRoute = express.Router();
// Post Books
booksRoute.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Books.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});
// Get All Books
booksRoute.get("/", async (req: Request, res: Response) => {
  try {
    const userGenre = req.query.genre;

    let allBooks;
    if (userGenre) {
      allBooks = await Books.find({ genre: userGenre });
    } else {
      allBooks = await Books.find().sort({ genre: 1 }).limit(10);
    }
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: allBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
});
// Get Single Book by Id
booksRoute.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const book = await Books.findById(bookId);
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
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
});
// Book Update
booksRoute.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const UpdateData = req.body 
    const updateBook = await Books.findByIdAndUpdate(bookId,UpdateData,{new:true})
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
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
});
// Book Delete
booksRoute.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deleteBook = await Books.findByIdAndDelete(bookId)
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
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
});
