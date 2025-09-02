import { Application, RequestHandler, Router } from "express";
import { rolesMiddleware } from "../middlewares/roles.middleware";
import { RolesEnum } from "../enums/roles.enum";
import { authMiddleware } from "../middlewares/auth.middleware";

export type EndPointType = {
  method: 'post' | 'put' | 'delete' | 'patch' | 'get'
  path: string
  handle: RequestHandler
}

export abstract class BaseController {

  constructor(app: Application) {


    // DISPONIBILIZAR TODOS END-POINTS PUBLICOS ANTES DE APLICAR OS MIDDLEWARES
    if (this.publicEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.publicEndPoints(),
        )
      );
    }

    // 🔑 router protegido com autenticação
    app.use(authMiddleware);

    // APLICANDO MIDDLEWARE DE ROLES

    // DEFAULT
    if (this.defaultEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.defaultEndPoints(),
          rolesMiddleware(undefined, this.basePath())
        )
      );
    }

    // ADMIN
    if (this.adminEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.adminEndPoints(),
          rolesMiddleware(RolesEnum.ADMIN)
        )
      );
    }

    // MANAGER
    if (this.managerEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.managerEndPoints(),
          rolesMiddleware(RolesEnum.MANAGER)
        )
      );
    }

    // OPERATOR
    if (this.operatorEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.operatorEndPoints(),
          rolesMiddleware(RolesEnum.OPERATOR)
        )
      );
    }
  }


  private applyEndPoints(endPoints: EndPointType[], middleware?: RequestHandler): Router {
    const router = Router()
    endPoints.forEach(endPoint => {
      if (middleware) {
        router[endPoint.method](endPoint.path, middleware, endPoint.handle)
      } else {
        router[endPoint.method](endPoint.path, endPoint.handle)
      }
    })
    return router
  }

  protected abstract basePath(): string;

  protected publicEndPoints?(): EndPointType[];
  protected defaultEndPoints?(): EndPointType[];
  protected adminEndPoints?(): EndPointType[];
  protected managerEndPoints?(): EndPointType[];
  protected operatorEndPoints?(): EndPointType[];

}