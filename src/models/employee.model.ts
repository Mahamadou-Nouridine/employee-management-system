import { model, Schema } from "mongoose";

const EmployeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    position: {
      type: String,
    },
    department: {
      type: String,
    },
    salary: {
      type: Number,
      min: 0,
    },
    dateOfJoining: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const EmployeeModel = model("employee", EmployeeSchema);
export default EmployeeModel;
