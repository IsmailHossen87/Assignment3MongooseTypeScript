import express, { Request, Response } from "express";
import { Borrow } from "../model/Borrow";
export const borrowRoute = express.Router();

borrowRoute.post("/", async (req: Request, res: Response) => {
  try { 
    const data = req.body
    const borrowBook = await Borrow.create(data);
    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowBook,
    });
  } catch (error:any)  {
    // উন্নত এরর হ্যান্ডলিং
    const statusCode = error.message.includes('not found') ? 404 : 
                      error.message.includes('enough copies') ? 400 : 500;
    
    res.status(statusCode).json({
      message: error.message || "Borrowing failed",
      success: false,
      error: {
        name: error.name,
        message: error.message
      }
    });
  }
});
borrowRoute.get("/",async(req:Request,res:Response)=>{
  try{

    const summary = await Borrow.aggregate([
      {
        $group:{
          _id:"$book",
          totalQuantity:{$sum:"$quantity"}
        }
      },
       {
        $lookup: {
          from: "books", // collection name in MongoDB
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
         book:{
           title: "$bookDetails.title",
          isbn: "$bookDetails.isbn",
         },
          totalQuantity: 1,
        },
      },
    ])
    
     res.status(200).json({
      success: true,
    message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  }catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error,
    });
  }
})
