import { Types } from "mongoose"

export interface booksInterface {
    title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}


export interface borrowInterface{
    book:Types.ObjectId
    quantity:number,
    dueDate:Date
}