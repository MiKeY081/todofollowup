import express from "express"
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todoControllers.js"
const router = express.Router()

router.post("/add",createTodo)
router.get("/get",getTodo)
router.delete("/delete/:id",deleteTodo)
router.put("/check/:id",updateTodo)

export {router as todoRoute}