import winston from "winston";
import path from "path";

const { combine, timestamp, printf } = winston.format;

// Winston logger format
const customFormat = printf(({ level, message, timestamp }) => {
  const log = {
    level,
    timestamp,
    ...JSON.parse(message),
  };
  return JSON.stringify(log);
});

// creating logger
const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), customFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: path.resolve("src", "logger", "error.logger.log"),
      level: "error",
    }),
  ],
});

export default logger;
