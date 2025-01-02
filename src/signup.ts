import registrationSchema from "./zodvalidation";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { UserModel } from "./db";
import bcrypt from "bcryptjs";

const signup: Function = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const parsedData: {
      username: string;
      password: string;
    } = registrationSchema.parse(req.body);
    const { username, password } = parsedData;

    const userAlreadyExists = await UserModel.findOne({ username });

    if (userAlreadyExists) {
      return res.status(403).json({ message: "Username Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username,
      password: hashPassword,
    });

    return res
      .status(200)
      .json({ message: "User Signed Up Sucessfully", data: { username } });
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(411)
        .json({ message: "Validation failed", errors: error.errors });
    }
    console.error("Unexpected error during sign-up:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default signup;
