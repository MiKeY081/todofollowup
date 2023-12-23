import bcrypt from "bcrypt";
import { UserModel } from "../models/userModal.js";
import { comparePassword } from "../bcrypt/passwordMatch.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password, image } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    if (name || email || password) {
      const isAlreadyRegistered = await UserModel.findOne({
        $and: [{ email, name }],
      });
      if (isAlreadyRegistered) {
        res.send({
          success: false,
          message: "User already exists",
        });
      } else {
        const user = await UserModel.create({
          name,
          email,
          password: hashedPassword,
          image,
        });
        res.status(200).send({
          success: true,
          message: "User created",
          user,
        });
      }
    } else {
      res.status(400).send({
        success: false,
        message: "Name email and password are required",
      });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err.message,
    });
  }
};
const getUsers = async (req, res) => {
  try {
    res.json(await UserModel.find());
  } catch (error) {
    res.json({ message: error.message });
  }
};
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isRegistered = await UserModel.findOne({ $and: [{ email }] });
    if (comparePassword(password, isRegistered.password))
      if (isRegistered) {
        const token = await jwt.sign(
          {
            id: isRegistered._id,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "5d" }
        );
        res
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .send({
            success: true,
            message: "You are free to go",
            isRegistered,
          });
      } else {
        res.status(400).send({
          success: false,
          message: "Invalid credentials",
        });
      }
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, userLogin, getUsers };
