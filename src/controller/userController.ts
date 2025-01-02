
import registrationSchema from "../lib/zod";
import { ZodError } from "zod";
import { Request, Response } from "express";
import { UserModel } from "../db/db";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../lib/ApiResponse";

export const signup = async (
  req: Request,
  res: Response
) => {
  try {
    const parsedData = registrationSchema.safeParse(req.body);
    if(!parsedData.success) return ApiResponse(res, 411, "Validation failed");
    const { username, password } = parsedData.data;

    const userAlreadyExists = await UserModel.findOne({ username });

    if (userAlreadyExists) return ApiResponse(res, 403, "Username Already Exists");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await UserModel.create({
      username,
      password: hashPassword,
    });

    res.status(200).json({ message: "User Signed Up Sucessfully", data: { username } });
    return;
  } catch (error) {
    if(error instanceof Error) return ApiResponse(res, 500, "Internal Server Error");
  }
};


export const signin = async (req: Request, res: Response) => {

}