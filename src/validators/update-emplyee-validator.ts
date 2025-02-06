import { Schema } from "express-validator";

export const updateEmployeeValidator: Schema = {
  position: {
    optional: false, // Position is required for updates
    isString: {
      errorMessage: "Position must be a string",
    },
    trim: true, // Sanitization: removes extra whitespace
    escape: true, // Sanitization: escapes HTML characters
  },
  salary: {
    optional: false, // Salary is required for updates
    isNumeric: {
      errorMessage: "Salary must be a valid number",
    },
  },
};
