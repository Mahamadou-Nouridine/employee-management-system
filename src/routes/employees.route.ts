import { Router } from "express";
import { checkSchema, param, query } from "express-validator";
import { createEmployeeSchema } from "../validators/create-employee-validator";
import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
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
  .get(
    // page and limit
    query("page")
      .isAlphanumeric()
      .toInt()
      .optional()
      // sanitize the input
      .escape(),
    //   .custom((v) => {
    //     return v > 0;
    //   }),
    query("limit")
      .isAlphanumeric()
      .toInt()
      .optional()
      // sanitize the input
      .escape(),
    //   .custom((v) => {
    //     return v > 0;
    //   })
    getAllEmployees
  );

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
    getEmployeeById
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
