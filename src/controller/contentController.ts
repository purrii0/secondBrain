import { Request, Response } from "express";
import { ApiResponse } from "../lib/ApiResponse";

const allContents = (req: Request, res: Response) => {
  return ApiResponse(res, 200, "Ola");
};

export default allContents;
