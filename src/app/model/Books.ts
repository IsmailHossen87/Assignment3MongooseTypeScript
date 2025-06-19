import { booksInterface } from './../interface/bookInterface';
import { model, Schema } from 'mongoose';


const booksModel =new Schema<booksInterface>({
    title:{type:String,required:true},
    author:{type:String,required:true},
    genre :{type:String,enum:["FICTION","FICTION","BIOGRAPHY","HISTORY","SCIENCE","FANTASY"],required: true},
    available:{type:Boolean},
     copies: { type: Number, required: true, min: 0 },
     description:{type:String},
       isbn: { type: String, required: true, unique: true },
},{
    versionKey:false,
    timestamps:true
})

export const Books =model("Book",booksModel)