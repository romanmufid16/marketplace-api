import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const generateToken = (user: User) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
}