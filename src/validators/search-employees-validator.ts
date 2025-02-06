import { Schema } from "express-validator";

export const searchEmployeesValidator: Schema = {
  name: {
    optional: true, // Query parameter is optional
    isString: {
      errorMessage: "Name must be a string",
    },
    trim: true, // Sanitization: Removes extra whitespace
    escape: true, // Sanitization: Escapes HTML characters
    isLength: {
      options: { max: 100 },
      errorMessage: "Name cannot exceed 100 characters",
    },
  },
  department: {
    optional: true, // Query parameter is optional
    isString: {
      errorMessage: "Department must be a string",
    },
    trim: true, // Sanitization: Removes extra whitespace
    escape: true, // Sanitization: Escapes HTML characters
    isLength: {
      options: { max: 50 },
      errorMessage: "Department cannot exceed 50 characters",
    },
  },
  position: {
    optional: true, // Query parameter is optional
    isString: {
      errorMessage: "Position must be a string",
    },
    trim: true, // Sanitization: Removes extra whitespace
    escape: true, // Sanitization: Escapes HTML characters
    isLength: {
      options: { max: 50 },
      errorMessage: "Position cannot exceed 50 characters",
    },
  },
};
