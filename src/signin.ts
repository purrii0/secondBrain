import { Request, RequestHandler, Response } from "express";
import { UserModel } from "./db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import registrationSchema from "./zodvalidation";
import { ZodError } from "zod";
import { configDotenv } from "dotenv";
configDotenv();

const signin: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedData = registrationSchema.parse(req.body);
    const { username, password } = parsedData;

    const registeredUser: {
      _id: string;
      username: string;
      password: string;
    } = await UserModel.findOne({ username });
    if (!registeredUser) {
      res.status(404).json({ message: "User not Found" });
      return;
    }
    const isValidPass = await bcrypt.compare(password, registeredUser.password);
    if (!isValidPass) {
      res.status(403).json({ message: "Password didn't match" });
      return;
    }
    const token = await jwt.sign(
      { id: registeredUser._id, username: username },
      process.env.SECRET
    );

    res.status(200).json({ token: token });
    return;
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(411)
        .json({ message: "Validation failed", errors: error.errors });
      return;
    }
    console.error("Unexpected error during sign-up:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};
