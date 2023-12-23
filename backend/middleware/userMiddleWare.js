import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModal.js";

export const isSignedIn  =  async( req, res, next ) => {
     try {
        const {token}  = req.cookies;
        const {id} = await jwt.verify(token, process.env.TOKEN_SECRET)
        const user = await UserModel.findById(id)
        req.user = user
        next()
     } catch (error) {
        res.send({
            success : true,
            message: error.message
        })
     }
     
}