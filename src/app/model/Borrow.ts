import { borrowInterface } from './../interface/bookInterface';

import { model, Schema,  } from 'mongoose';


const borrosSchema =new Schema<borrowInterface>({
    book:{type:Schema.Types.ObjectId,required:true,ref:"Book"},
    quantity:{type:Number,required:true},
    dueDate :{type:Date,required:true}
},{
    versionKey:false,
    timestamps:true
})


export const Borrow = model("Borrow",borrosSchema)