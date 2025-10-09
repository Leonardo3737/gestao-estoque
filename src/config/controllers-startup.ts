import { Application } from "express";
import { UserRoleController } from '../controllers/user-role.controller';
import { UserController } from "../controllers/user.controller";
import { WarehouseController } from '../controllers/warehouse.controller';
import { AisleController } from '../controllers/aisle.controller';
import { LocationController } from '../controllers/location.controller';
import { CategoryController } from "../controllers/category.controller";
import { ProductController } from "../controllers/product.controller";
import { TransactionController } from "../controllers/transaction.controller";
import { TransactionLocationController } from "../controllers/transaction-location.controller";

export function controllersStartup(app: Application) {

  /* USER */
  new UserController(app)

  /* ROLES */
  new UserRoleController(app)

  /* WAREHOUSE */
  new WarehouseController(app)

  /* AISLE */
  new AisleController(app)

  /* LOCATION */
  new LocationController(app)

  /* CATEGORY */
  new CategoryController(app)

  /* PRODUCT */
  new ProductController(app)

  /* TRANSACTION */
  new TransactionController(app)

  /* TRANSACTION LOCATION */
  new TransactionLocationController(app)
}