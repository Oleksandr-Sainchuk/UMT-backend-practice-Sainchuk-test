import { HTTP_STATUS } from "../constants/httpStatus.js";
import { apiMessages } from "../constants/messages.js";

export function errorHandler(err, _req, res, _next) {
  const status = err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message = err.message || apiMessages.serverError;

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  res.status(status).json({ message });
}
