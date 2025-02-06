import dotenv from "dotenv";
// load environment variables
dotenv.config();
import express from "express";
import { connectToDb } from "../lib/db";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();
app.use(express.json());

// data sanitisation against No-Sql query injection
app.use(ExpressMongoSanitize());

// connect to the db
const port = process.env.PORT || 4000;
console.log(port);
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
