import { NextFunction, Request, Response } from "express";
import { RolesEnum } from "../enums/roles.enum";
import { getParamsId } from "../utils/get-params-id";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../errors/app.error";

export function rolesMiddleware(role?: RolesEnum) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.sub
    if (!userId) {
      throw new AppError('You are not allowed to access this resource', 403, 'FORBIDDEN');
    }
    console.log(role)
    const userRepository = new UserRepository()
    const user = await userRepository.listUserById(userId)
    
    if(!user) {
      throw new AppError('You are not allowed to access this resource', 403, 'FORBIDDEN');
    }

    const userRole = user?.roles?.find(u => u.role === role)    

    if(!userRole) {
      throw new AppError('You are not allowed to access this resource', 403, 'FORBIDDEN');
    }

    next()
  }
}