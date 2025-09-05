import { Application } from "express";
import { UserRoleController } from '../controllers/user-role.controller';
import { UserController } from "../controllers/user.controller";

export function controllersStartup(app: Application) {

  /* USER */
  new UserController(app)

  /* ROLES */
  new UserRoleController(app)

  /* WAREHOUSE */
  //new WarehouseController(app)
}