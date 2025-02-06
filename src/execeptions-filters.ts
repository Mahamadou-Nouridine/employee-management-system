import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";

export const mongoDbExceptionFilter = (error: MongoError, res: Response) => {
  switch (error.code) {
    case 11000:
      return res
        .status(400)
        .json({ message: "A user with the same email already exist" });
      break;

    default:
      return res.status(500).json({ message: "server side error" });
      break;
  }
};

export const mainExecptionFilter = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  console.log({ error });
  if (error instanceof MongoError) {
    return mongoDbExceptionFilter(error, res);
  }
  return res.status(500).json({ message: "server side error" });
};
