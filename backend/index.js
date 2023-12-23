import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import {config} from "dotenv"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import { todoRoute } from "./Routes/todoRoute.js"
import { userRoute } from "./Routes/userRoute.js"

config()
const app = express()

app.use(cookieParser())
app.use(cors({
    origin: "https://todofollowup.vercel.app",
    secure: true,
}))
app.use(morgan("dev"))
app.use(express.json())
await mongoose.connect(process.env.MONGODB_URL)

app.use("/api/v1/todo",todoRoute)
app.use("/api/v1/user",userRoute)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log("Server is running",PORT)
})