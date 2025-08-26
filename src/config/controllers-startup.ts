import { Application } from "express";

import { UserController } from "../controllers/user.controller";

import { UserService } from "../services/user.service";
import { UserRepository } from "../repositories/user.repository";


export function controllersStartup(app: Application) {

  /* USER */
  const userRespository = new UserRepository()
  const userService = new UserService(userRespository)
  new UserController(app, userService)


}