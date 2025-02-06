import dotenv from "dotenv";
// load environment variables
dotenv.config();
import express from "express";
import cors from "cors";

import { connectToDb } from "../lib/db";
import ExpressMongoSanitize from "express-mongo-sanitize";
import employeesRouter from "./routes/employees.route";
import authRouter from "./routes/auth.toute";
const app = express();

// cors
app.use(cors());

// parse body data
app.use(express.json());

// data sanitisation against No-Sql query injection
app.use(ExpressMongoSanitize());

// bind the quth route
app.use("/auth", authRouter);

// bind the employees route
app.use("/employees", employeesRouter);

// server healf-check endpoint
app.get("/", (req, res) => {
  res.send("Hello world!");
});

// customize unexistent endpoint output
app.all("*", (req, res) => {
  res.status(404).json({
    status: "Not found route",
    message: `Can't find ${req.originalUrl} on this server`,
  });
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
