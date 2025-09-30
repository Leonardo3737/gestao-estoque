import { NextFunction, Request, Response } from "express";
import { RolesEnum } from "../enums/roles.enum";
import { getParamsId } from "../utils/get-params-id";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../errors/app.error";

export function rolesMiddleware(role?: RolesEnum, path?: string) {
  console.log(path)
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(path)
    const userId = req.user?.sub
    if (!userId) {
      throw new AppError('You are not allowed to access this resource', 403, 'FORBIDDEN');
    }

    const userRepository = new UserRepository()
    const user = await userRepository.listById(userId)

    console.log(req.user);
    console.log(user);


    if (!user) {
      throw new AppError('token is required', 401, 'UNAUTHORIZED');
    }

    const { path: reqPath } = req
    const pathWithoutQuery = reqPath.split('?')[0]

    let isAuthorized: boolean = false
    let isAdmin: boolean = false

    user?.roles?.forEach(u => {
      if (u.role === RolesEnum.ADMIN) {
        isAdmin = true
      } else if (u.role === role) {
        isAuthorized = true
      }
    })


    console.log({
      isAdmin,
      path,
      pathWithoutQuery
    })

    if (!isAdmin && path === '/user' && pathWithoutQuery?.startsWith('/')) {
      const separedPath = pathWithoutQuery.split('/')

      const paramId = Number(separedPath.find(node => node && !isNaN(Number(node))))

      if (paramId && paramId !== user.id) {
        throw new AppError('You are not allowed to access this resource', 403, 'FORBIDDEN');
      }
    } else if (!isAuthorized && !isAdmin && role) {
      throw new AppError('You are not allowed to access this resource', 403, 'FORBIDDEN');
    }

    next()
  }
}