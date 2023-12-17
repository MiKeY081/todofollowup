import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import { createTodo, deleteTodo, getTodo, updateTodo } from "./controllers/todoControllers.js"

const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
await mongoose.connect(process.env.MONGODB_URL)

app.post("/add",createTodo)
app.get("/get",getTodo)
app.delete("/delete/:id",deleteTodo)
app.put("/check/:id",updateTodo)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log("Server is running")
})