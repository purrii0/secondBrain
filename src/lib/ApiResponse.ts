import { Response } from "express";


export const ApiResponse = (res: Response, code: number, message: string) => {
    res.status(code).json({ message });
    return;
}