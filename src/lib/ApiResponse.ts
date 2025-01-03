import { Response } from "express";

export const ApiResponse = (
  res: Response,
  code: number,
  message: string | object
) => {
  res.status(code).json({ message });
  return;
};
