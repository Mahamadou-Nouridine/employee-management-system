import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyJwtMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) return res.status(401).json({ message: "unauthorized" });

  try {
    const decodedValue = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      role: string;
    };

    (req as unknown as Request & { jwtData: any }).jwtData = decodedValue;
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }

  return next();
};
