import express, { Application, Request, Response } from "express"
import { booksRoute } from "./app/controler/bookController"
import { borrowRoute } from "./app/controler/borrowControler"

const app:Application = express()
app.use(express.json())

app.use('/api/books',booksRoute)
app.use('/api/borrow',borrowRoute)


app.get('/',async(req:Request,res:Response)=>{
    res.send("TO DO MONGOOSE")
})
export default app;