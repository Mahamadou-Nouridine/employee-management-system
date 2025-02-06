import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

// const winston = require('winston');
const logger = winston.createLogger({
  level: "info",
  levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.errors({ stack: true }),
        winston.format.timestamp(), // Add timestamp to each log
        winston.format.printf(
          ({ timestamp, level, message, logMetadata, stack }) => {
            return `${timestamp} [${level}]: ${logMetadata || ""} ${message} ${
              stack || ""
            }`; // Custom log format
          }
        )
      ),
    }),
  ],
});

// transport to store logs to a rotating file
const fileRotateTransport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json()
  ),
});

logger.add(fileRotateTransport);

export default logger;
