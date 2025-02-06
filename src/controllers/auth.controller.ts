import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const generateToken = async (
  req: Request,
  res: Response
): Promise<any> => {
  // gather the input
  const role = req.params.role;

  // generate the token
  const token = jwt.sign(
    {
      role,
      id: Date.now.toString(),
    },
    process.env.JWT_SECRET
  );

  return res.json({ token });
};
