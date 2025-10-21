import { NextFunction, Request, Response } from "express";
import RequestModel from "../models/request.model";

export function requestLogMiddleware(req: Request, res: Response, next: NextFunction) {

  res.on("finish", async () => {

    try {
      await RequestModel.create({
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        body: req.originalUrl !== '/user/auth' ? req.body : null,
        response: res.locals?.responseData,
        ipAddress: req.ip,
        userId: req.user?.sub
      });
    }
    catch {
      await RequestModel.create({
        method: req.method,
        endpoint: req.originalUrl,
        statusCode: res.statusCode,
        body: req.originalUrl !== '/user/auth' ? req.body : null,
        response: res.locals?.responseData,
        ipAddress: req.ip,
      });
    }
  });

  next();
}