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

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<any> => {
  // validate the input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const data = req.body as Pick<Employee, "position" | "salary">;
  const id = req.params.id;

  const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (updatedEmployee)
    return res.json({ message: "Employee updated successfully" });

  return res
    .status(500)
    .json({ message: "An error occured while updating the the employee" });
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

  // missing employee
  if (!employee)
    return res
      .status(404)
      .json({ message: "Can't find the employee with the provided id" });
  return res.json(employee);
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<any> => {
  // validate the input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const id = req.params.id;
  const employee = await EmployeeModel.findByIdAndDelete(id);

  if (employee) return res.json({ message: "Employee deleted successfully" });

  return res
    .status(500)
    .json({ message: "An error occured while deleting the the employee" });
};

export const search = async (req: Request, res: Response): Promise<any> => {
  // retrieve parameters
  const name = req.query.name;
  const department = req.query.department;
  const position = req.query.position;

  console.log({ name, department, position });

  const employees = await EmployeeModel.find({
    ...(name ? { name: { $regex: name, $options: "i" } } : {}),
    ...(department ? { department } : {}),
    ...(position ? { position } : {}),
  });

  return res.json(employees);
};
