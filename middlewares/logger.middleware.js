import moment from "moment-timezone";
import morgan from "morgan";

const loggerOptions = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
  ].join("  ");
};

export const customLogger = morgan(loggerOptions);
