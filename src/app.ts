import dotenv from "dotenv";
// load environment variables
dotenv.config();
import express, { NextFunction, Request } from "express";
import cors from "cors";

import { connectToDb } from "../lib/db";
import ExpressMongoSanitize from "express-mongo-sanitize";
import employeesRouter from "./routes/employees.route";
import authRouter from "./routes/auth.toute";
import morgan from "morgan";
import { mainExecptionFilter } from "./exceptions/execeptions-filters";
const app = express();

app
  // cors
  .use(cors())

  // parse body data
  .use(express.json())

  // data sanitisation against No-Sql query injection
  .use(ExpressMongoSanitize())

  // Request logging
  .use(morgan("combined"))

  // bind the quth route

  .use("/auth", authRouter)

  // bind the employees route
  .use("/employees", employeesRouter)

  // server healf-check endpoint
  .get("/", (req, res) => {
    res.send("Hello world!");
  })

  // customize unexistent endpoint output
  .all("*", (req, res) => {
    res.status(404).json({
      status: "Not found route",
      message: `Can't find ${req.originalUrl} on this server`,
    });
  })

  // global error handeling
  .use(mainExecptionFilter);

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
