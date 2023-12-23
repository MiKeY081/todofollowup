import express from "express"
import { getUsers, registerUser, userLogin } from "../controllers/userController.js"
import { isSignedIn } from "../middleware/userMiddleWare.js"
import { getTodo } from "../controllers/todoControllers.js"

const router = express.Router()

router.get("/login",userLogin)
router.post("/register", registerUser)
router.get("/getUser", getUsers)
router.get("/todo", isSignedIn, getTodo)

export {router as userRoute}