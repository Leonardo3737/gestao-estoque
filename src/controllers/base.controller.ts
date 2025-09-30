import { Application, RequestHandler, Router } from "express";
import { rolesMiddleware } from "../middlewares/roles.middleware";
import { RolesEnum } from "../enums/roles.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { BaseService } from "../services/base.service";
import { Model } from "sequelize";

export type EndPointType = {
  method: 'post' | 'put' | 'delete' | 'patch' | 'get'
  path: string
  handle: RequestHandler
}


export abstract class BaseController<
  TModel extends Model,
  TService extends BaseService<TModel>
> {

  protected service: TService

  constructor(
    {
      app,
      service
    }: {
      app: Application,
      service: TService
    }) {

      this.service = service

    // DISPONIBILIZAR TODOS END-POINTS PUBLICOS ANTES DE APLICAR OS MIDDLEWARES
    if (this.publicEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.publicEndPoints(),
        )
      );
    }


    // APLICANDO MIDDLEWARES

    // DEFAULT
    if (this.defaultEndPoints) {
      console.log(this.basePath());
      
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.defaultEndPoints(),
          [
            authMiddleware,
            rolesMiddleware(undefined, this.basePath())
          ]
        )
      );
    }

    // ADMIN
    if (this.adminEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.adminEndPoints(),
          [
            authMiddleware,
            rolesMiddleware(RolesEnum.ADMIN)
          ]
        )
      );
    }

    // MANAGER
    if (this.managerEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.managerEndPoints(),
          [
            authMiddleware,
            rolesMiddleware(RolesEnum.MANAGER)
          ]
        )
      );
    }

    // OPERATOR
    if (this.operatorEndPoints) {
      app.use(
        this.basePath(),
        this.applyEndPoints(
          this.operatorEndPoints(),
          [
            authMiddleware,
            rolesMiddleware(RolesEnum.OPERATOR)
          ]
        )
      );
    }
  }


  private applyEndPoints(endPoints: EndPointType[], middleware?: RequestHandler | RequestHandler[]): Router {
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