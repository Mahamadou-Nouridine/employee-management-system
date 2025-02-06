import * as mongoose from "mongoose";

const dbString = process.env.DB_STRING;
export const connectToDb = (
  successCb?: (connection: mongoose.Mongoose) => any,
  errorCb?: (reason: any) => any
) => {
  mongoose
    .connect(dbString)
    .then((connection) => {
      console.log('DB-LOG: connected successfully to the db')
      successCb?.(connection);
    })
    .catch((reason) => {
      errorCb?.(reason);
    });
};

// close the connection when the db exits
process.on("SIGINT", () => {
  mongoose.connection.close();
});

