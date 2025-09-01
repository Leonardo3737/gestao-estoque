import { Application } from "express";

import { UserController } from "../controllers/user.controller";

import { RolesController } from '../controllers/roles.controller';
import { RolesRepository } from '../repositories/roles.repository';
import { UserRepository } from "../repositories/user.repository";
import { RolesService } from '../services/roles.service';
import { UserService } from "../services/user.service";


export function controllersStartup(app: Application) {

  /* USER */
  const userRespository = new UserRepository()
  const userService = new UserService(userRespository)
  new UserController(app, userService)

  /* ROLES */
  const rolesRespository = new RolesRepository()
  const rolesService = new RolesService(rolesRespository)
  new RolesController(app, rolesService)

}