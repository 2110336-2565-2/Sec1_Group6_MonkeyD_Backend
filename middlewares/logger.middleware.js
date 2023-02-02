import moment from "moment-timezone";
import morgan from "morgan";

const loggerOptions = (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    moment().tz("Asia/Bangkok").format(),
    tokens["remote-addr"](req, res),
    tokens["user-agent"](req, res),
  ].join(" ");
};

export const customLogger = morgan(loggerOptions);
