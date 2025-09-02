import { Application, RequestHandler, Router } from "express";
import { rolesMiddleware } from "../middlewares/roles.middleware";
import { RolesEnum } from "../enums/roles.enum";
import { authMiddleware } from "../middlewares/auth.middleware";

type ControllerBaseOptions = {
  app: Application;
  isPublic?: false;
}

export type EndPointType = {
  method: 'post' | 'put' | 'delete' | 'patch' | 'get'
  path: string
  handle: RequestHandler
}

export abstract class BaseController {

  constructor({
    app,
    isPublic = false
  }: ControllerBaseOptions) {


    if (this.publicEndPoints) {
      const publicRouter = Router();
      this.publicEndPoints().forEach(endPoint => {
        publicRouter[endPoint.method](endPoint.path, endPoint.handle)
      })
      app!.use(this.basePath(), publicRouter);
    }

    // CASO NÃO SEJA PUBLICO, APLICA OS MIDDLEWARES
    if (!isPublic) {
      // DISPONIBILIZAR TODOS END-POINTS PUBLICOS ANTES DE APLICAR OS MIDDLEWARES

      // 🔑 router protegido com autenticação
      app.use(authMiddleware);

      // APLICANDO MIDDLEWARE DE ROLES

      // ADMIN
      if (this.adminEndPoints) {
        app.use(
          this.basePath(),
          this.applyMiddlewares(
            this.adminEndPoints(),
            rolesMiddleware(RolesEnum.ADMIN)
          )
        );
      }

      // MANAGER
      if (this.managerEndPoints) {
        app.use(
          this.basePath(),
          this.applyMiddlewares(
            this.managerEndPoints(),
            rolesMiddleware(RolesEnum.MANAGER)
          )
        );
      }

      // OPERATOR
      if (this.operatorEndPoints) {
        app.use(
          this.basePath(),
          this.applyMiddlewares(
            this.operatorEndPoints(),
            rolesMiddleware(RolesEnum.OPERATOR)
          )
        );
      }
    }
  }

  private applyMiddlewares(endPoints: EndPointType[], middleware: RequestHandler): Router {
    const router = Router()
    endPoints.forEach(endPoint => {
      router[endPoint.method](endPoint.path, middleware, endPoint.handle)
    })
    return router
  }

  protected abstract basePath(): string;

  protected adminEndPoints?(): EndPointType[];
  protected managerEndPoints?(): EndPointType[];
  protected operatorEndPoints?(): EndPointType[];
  protected publicEndPoints?(): EndPointType[];

}