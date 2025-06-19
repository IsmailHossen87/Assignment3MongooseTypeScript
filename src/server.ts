const port = 5000
import {Server} from "http"
import app from "./app";
import mongoose from "mongoose";
let server:Server;

async function main(){ 
     await mongoose.connect("mongodb+srv://BooksStore:NkeUNb4HIptTPKSl@cluster0.hg2ad.mongodb.net/BooksStore?retryWrites=true&w=majority&appName=Cluster0");
    server = app.listen(port,()=>{
        console.log(`Port is runing ${port}`)
    })
}
main()