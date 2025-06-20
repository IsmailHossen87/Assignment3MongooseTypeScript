import { Types } from "mongoose"

export interface borrowInterface{
    book:Types.ObjectId
    quantity:number
    dueDate:Date
}