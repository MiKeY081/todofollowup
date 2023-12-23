import bcrypt from "bcrypt"
export const comparePassword = async (password , hashedPassword)  =>  {
const check = await  bcrypt.compare(password, hashedPassword)  
return check
}