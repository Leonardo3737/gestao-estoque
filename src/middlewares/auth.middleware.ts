import { NextFunction, Request, Response } from "express";
import { isJWTValid } from "../utils/jwt";
import { AppError } from "../errors/app.error";

export function authMiddleware(req: Request, _: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : ''

  const jwtPayload = isJWTValid(token)  

  if (!token || !jwtPayload) {
    throw new AppError('token is required', 401, 'UNAUTHORIZED')
  }

  req.user = jwtPayload

  next()
}