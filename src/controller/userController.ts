import { registrationSchema, loginSchema } from "../lib/zod";
import { Request, Response } from "express";
import { UserModel } from "../db/db";
import bcrypt from "bcryptjs";
import { ApiResponse } from "../lib/ApiResponse";
import jwt from "jsonwebtoken";
import { ENV } from "../config";

export const signup = async (req: Request, res: Response) => {
  try {
    const parsedData = registrationSchema.safeParse(req.body);
    if (!parsedData.success) return ApiResponse(res, 411, "Validation failed");
    const { username, password } = parsedData.data;

    const userAlreadyExists = await UserModel.findOne({ username });

    if (userAlreadyExists)
      return ApiResponse(res, 403, "Username Already Exists");

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
    if (error instanceof Error)
      return ApiResponse(res, 500, "Internal Server Error");
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) return ApiResponse(res, 411, "Validation failed");
    const { username, password } = parsedData.data;

    const validUser = await UserModel.findOne({ username });
    if (!validUser) {
      return ApiResponse(res, 404, "User Not found");
    }

    if (!validUser.password) {
      return ApiResponse(res, 500, "Password not found for user");
    }

    const validPass = await bcrypt.compare(password, validUser.password);
    if (!validPass) {
      return ApiResponse(res, 403, "Password Incorrect");
    }
    const secret = ENV.secret;
    if (!secret) {
      return ApiResponse(res, 500, "Internal Server Err0r");
    }
    const token = await jwt.sign(
      { id: validUser._id, username: username },
      secret,
      { expiresIn: "1h" }
    );

    return ApiResponse(res, 200, token);
  } catch (error) {
    if (error instanceof Error)
      return ApiResponse(res, 500, "Internal Server Error");
  }
};
