import { Router } from "express";
import { checkSchema, param } from "express-validator";
import { createEmployeeSchema } from "../validators/create-employee-validator";
import {
  createEmployee,
  getAllEmployeeById,
  getAllEmployees,
} from "../controllers/employeee.controller";
import mongoose, { isValidObjectId } from "mongoose";

const employeesRouter = Router();

employeesRouter
  .route("")
  .post(checkSchema(createEmployeeSchema), createEmployee)
  .get(getAllEmployees);

employeesRouter.route("/:id").get(
  param("id")
    .custom((value) => {
      const isValid = mongoose.Types.ObjectId.isValid(value);
      console.log({ isValid, value });
      return isValid;
    })
    .withMessage("The id should be a valid object id"),
  getAllEmployeeById
);

export default employeesRouter;
