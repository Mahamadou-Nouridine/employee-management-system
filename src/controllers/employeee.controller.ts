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
  const { createdAt, updatedAt, __v, ...rest } = newEmployee.toJSON();

  return res.status(201).json({
    ...rest,
  });
};

export const getAllEmployees = async (
  req: Request,
  res: Response
): Promise<any> => {
  const employees = await EmployeeModel.find({}).select(
    "-__v -createdAt -updatedAt"
  );
  return res.json(employees);
};

export const getAllEmployeeById = async (
  req: Request,
  res: Response
): Promise<any> => {
  // validate the input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const id = req.params.id;
  const employee = await EmployeeModel.findById(id).select(
    "-__v -createdAt -updatedAt"
  );
  return res.json(employee);
};
