import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../lib/ApiResponse";
import { ENV } from "../config";
import { string } from "zod";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers["authorization"];
    console.log(req);
    console.log(token);
    if (!token) {
      return ApiResponse(res, 403, "You are not signed In");
    }
    const decoded = (await jwt.verify(token, ENV.secret)) as JwtPayload;
    if (!decoded) {
      return ApiResponse(res, 403, "Forbidden");
    }
    req.id = decoded.id;
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error);
    return ApiResponse(res, 401, "Invalid or expired token");
  }
};

export default protectRoute;
