import registrationSchema from "./zodvalidation";
import { ZodError } from "zod";
import { Request, RequestHandler, Response } from "express";
import { UserModel } from "./db";
import bcrypt from "bcryptjs";

const signup: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsedData: {
      username: string;
      password: string;
    } = registrationSchema.parse(req.body);
    const { username, password } = parsedData;

    const userAlreadyExists = await UserModel.findOne({ username });

    if (userAlreadyExists) {
      res.status(403).json({ message: "Username Already Exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username,
      password: hashPassword,
    });

    res
      .status(200)
      .json({ message: "User Signed Up Sucessfully", data: { username } });
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

export default signup;
