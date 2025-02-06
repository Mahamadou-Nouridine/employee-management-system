import { Router } from "express";
import { checkSchema } from "express-validator";
import { createEmployeeSchema } from "../validators/create-employee-validator";
import { createEmployee, getAllEmployees } from "../controllers/employeee.controller";

const employeesRouter = Router();

employeesRouter
  .route("")
  .post(checkSchema(createEmployeeSchema), createEmployee)
  .get(getAllEmployees);

export default employeesRouter;
