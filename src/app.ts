import dotenv from "dotenv";
// load environment variables
dotenv.config();
import express from "express";
import cors from "cors";

import { connectToDb } from "../lib/db";
import ExpressMongoSanitize from "express-mongo-sanitize";
import employeesRouter from "./routes/employees.route";
const app = express();

// cors
app.use(cors());

// parse body data
app.use(express.json());

// data sanitisation against No-Sql query injection
app.use(ExpressMongoSanitize());

// bind the employees route
app.use("/employees", employeesRouter);
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// connect to the db
const port = process.env.PORT || 4000;
connectToDb(
  () => {
    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  },
  (reason) => {
    console.log("DB-LOG: An error occured while connecting to the db ", reason);
  }
);
