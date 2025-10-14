import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";
import { ValidationError } from "../errors/validation.error";
import { SequelizeScopeError } from "sequelize";

export default function responseError(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) {
  response.locals!.responseData = error
  console.log(error);

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message,
    });
    return
  }
  if (error instanceof ValidationError) {
    response.status(error.statusCode).json({
      status: 'error',
      message: error.message, // vou mostrar as duas formas
      issues: error.issues
    });
    return
  }


  response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}