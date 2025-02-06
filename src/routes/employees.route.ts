import { Router } from "express";
import { checkSchema, param } from "express-validator";
import { createEmployeeSchema } from "../validators/create-employee-validator";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployeeById,
  getAllEmployees,
  search,
  updateEmployee,
} from "../controllers/employeee.controller";
import mongoose from "mongoose";
import { updateEmployeeValidator } from "../validators/update-emplyee-validator";
import { searchEmployeesValidator } from "../validators/search-employees-validator";
import { verifyJwtMiddleWare } from "../middleware/verify-jwt.middleware";
import { verifyRoleMiddleWare } from "../middleware/verify-role.middleware";

const employeesRouter = Router();

employeesRouter
  .route("")
  .post(
    checkSchema(createEmployeeSchema, ["body"]),
    verifyJwtMiddleWare,
    verifyRoleMiddleWare(["admin"]),
    createEmployee
  )
  .get(getAllEmployees);

employeesRouter
  .route("/search")
  .get(checkSchema(searchEmployeesValidator, ["query"]), search);

employeesRouter
  .route("/:id")
  .get(
    param("id")
      .isString()
      .notEmpty()
      // sanitize the input
      .escape()
      .custom((value) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        return isValid;
      })
      .withMessage("The id should be a valid object id"),
    getAllEmployeeById
  )
  .put(
    param("id")
      .isString()
      .notEmpty()
      // sanitize the input
      .escape()
      .custom((value) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        return isValid;
      })
      .withMessage("The id should be a valid object id"),
    checkSchema(updateEmployeeValidator, ["body"]),
    updateEmployee
  )
  .delete(
    param("id")
      .isString()
      .notEmpty()
      // sanitize the input
      .escape()
      .custom((value) => {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        return isValid;
      })
      .withMessage("The id should be a valid object id"),
    deleteEmployee
  );

export default employeesRouter;
