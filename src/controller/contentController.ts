import { Request, Response } from "express";
import { ApiResponse } from "../lib/ApiResponse";
import { contentSchema } from "../lib/zod";
import { ContentModel } from "../db/db";

const addContent = async (req: Request, res: Response) => {
  try {
    const parsedData = contentSchema.safeParse(req.body);
    if (!parsedData.success) return ApiResponse(res, 411, "Validation failed");

    const { type, link, title, tags } = parsedData.data;

    const userId = req.id;

    const data = await ContentModel.create({
      type,
      link,
      title,
      tags,
      ref: userId,
    });

    return ApiResponse(res, 200, `Content Added Successfully, ${data}`);
  } catch (error) {
    console.error("Error in addContent:", error);
    return ApiResponse(res, 500, "Internal Server Error");
  }
};

const allContents = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const data = await ContentModel.find({ ref: userId });
    return ApiResponse(res, 200, data);
  } catch (error) {
    console.error("Error in allContents:", error);
    return ApiResponse(res, 500, "Internal Server Error");
  }
};

export { allContents, addContent };
