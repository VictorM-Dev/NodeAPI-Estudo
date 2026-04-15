import type { Request, Response, NextFunction } from "express";
import { AppError } from "../model/error/appError.js";

export function erroMiddleware(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AppError) {
    res.status(err.status).json({ type: err.type, message: err.message });
  } else {
    res.status(500).json({ type: "internal-server-error", message: "Internal server error" });
  }
}
