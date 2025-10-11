import { NextFunction, Request, Response } from "express";
import RequestModel from "../models/request.model";

export function requestLogMiddleware(req: Request, res: Response, next: NextFunction) {

  res.on("finish", async () => {

    await RequestModel.create({
      method: req.method,
      endpoint: req.originalUrl,
      statusCode: res.statusCode,
      body: req.body,
      response: res.locals?.responseData,
      ipAddress: req.ip,
      userId: req.user?.sub
    });
  });

  next();
}