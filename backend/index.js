import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import { createTodo, deleteTodo, getTodo, updateTodo } from "./controllers/todoControllers.js"

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
await mongoose.connect("mongodb+srv://twitter-clone:twitter123@cluster0.bco6omb.mongodb.net/?retryWrites=true&w=majority").catch(err=>err.message)

app.post("/add",createTodo)
app.get("/get",getTodo)
app.delete("/delete/:id",deleteTodo)
app.put("/check/:id",updateTodo)

app.listen(5001, ()=>{
    console.log("Server is running")
})