import { checkSchema, Schema } from "express-validator";

export const createEmployeeSchema: Schema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
    trim: true, // Sanitization: Removes extra whitespace
    escape: true, // Sanitization: Escapes HTML characters
  },
  email: {
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Invalid email format",
    },
    normalizeEmail: true, // Sanitization: Normalizes the email
  },
  position: {
    notEmpty: {
      errorMessage: "Position is required",
    },
    isString: {
      errorMessage: "Position must be a string",
    },
    trim: true, // Sanitization
    escape: true, // Sanitization
  },
  department: {
    notEmpty: {
      errorMessage: "Department is required",
    },
    isString: {
      errorMessage: "Department must be a string",
    },
    trim: true, // Sanitization
    escape: true, // Sanitization
  },
  salary: {
    notEmpty: {
      errorMessage: "Salary is required",
    },
    isNumeric: {
      errorMessage: "Salary must be a valid number",
    },
    toFloat: true, // Sanitization: Converts to a float
  },
  dateOfJoining: {
    notEmpty: {
      errorMessage: "Date of joining is required",
    },
    isISO8601: {
      errorMessage:
        "Date of joining must be in a valid ISO 8601 format (e.g., YYYY-MM-DD)",
    },
    toDate: true, // Sanitization: Converts to a JavaScript Date object
  },
};
