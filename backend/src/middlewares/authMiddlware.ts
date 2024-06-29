import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if(!token) {
    return res.status(401).json({ message: "User not logged in" });
  }

  try{
    const user = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = user;
    next();
  }
  catch(error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}