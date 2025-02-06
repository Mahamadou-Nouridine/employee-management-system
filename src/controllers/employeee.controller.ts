import { Request, Response } from "express";
import { Employee } from "../../lib/types";
import { validationResult } from "express-validator";
import EmployeeModel from "../models/employee.model";

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<any> => {
  // validate the input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const data = req.body as Employee;

  const newEmployee = await EmployeeModel.create(data);
  const { createdAt, updatedAt, __v, _id, ...rest } = newEmployee.toJSON();

  return res.status(201).json({
    id: _id,
    ...rest,
  });
};
