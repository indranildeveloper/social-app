import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ValidationError } from "joi";
import config from "../config/config";
import CustomErrorHandler from "../services/CustomErrorHandler";

const { DEBUG_MODE } = config;

const errorMiddleware: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  let statusCode = 500;
  let data = {
    message: "Internal server error!",
    ...(DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err instanceof ValidationError) {
    statusCode = 422;
    data = {
      message: err.message,
    };
  }

  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

export default errorMiddleware;
