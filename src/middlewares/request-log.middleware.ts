import { NextFunction, Request, Response } from "express";
import { isJWTValid } from "../utils/jwt";
import { AppError } from "../errors/app.error";
import RequestModel from "../models/request.model";

export function requestLogMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on("finish", async () => {
    console.log({
      res,
      locals: res.locals,
    });
    
    await RequestModel.create({
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      body: req.body,
      response: res.locals?.responseData,
      ipAddress: req.ip,
    });
  });

  next();
}