import { Application } from "express";

import { UserController } from "../controllers/user.controller";

import { UserRoleController } from '../controllers/user-role.controller';
import { UserRoleRepository } from '../repositories/user-role.repository';
import { UserRepository } from "../repositories/user.repository";
import { UserRolesService } from '../services/user-role.service';
import { UserService } from "../services/user.service";
import { WarehouseController } from "../controllers/warehouse.controller";


export function controllersStartup(app: Application) {

  /* USER */
  const userRespository = new UserRepository()
  const userService = new UserService(userRespository)
  new UserController(app, userService)

  /* ROLES */
  const rolesRespository = new UserRoleRepository()
  const rolesService = new UserRolesService(rolesRespository)
  new UserRoleController(app, rolesService)

  /* WAREHOUSE */
  new WarehouseController(app)
}