import { NextFunction, Request, Response } from "express";
import { MongoError } from "mongodb";
import { getErrorMessage } from "../../lib/utils/get-error-message";
import logger from "./logger";

export const mongoDbExceptionFilter = (error: MongoError, res: Response) => {
  switch (error.code) {
    case 11000:
      return res
        .status(400)
        .json({ message: "A user with the same email already exist" });
      break;

    default:
      // log unhandeled errors
      logger.error("An error occured", error);
      return res.status(500).json({ message: "An error occured" });
      break;
  }
};

export const mainExecptionFilter = async (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (error instanceof MongoError) {
    return mongoDbExceptionFilter(error, res);
  }

  // log unhandeled errors
  logger.error("An error occured", error);

  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({ message: "An error occured" });
  next();
};
