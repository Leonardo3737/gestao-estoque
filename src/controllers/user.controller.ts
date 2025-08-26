import { Application, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dtos/user/create-user.dto";
import { UserAuthDTO } from "../dtos/user/user-auth.dto";
import { AppError } from "../errors/app.error";
import { getParamsId } from "../utils/get-params-id";
import { UpdateUserDTO } from "../dtos/user/update-user.dto";


export class UserController {

  static path = '/user'
  static pathWithId = `${UserController.path}/:id`

  static authPath = `${UserController.path}/auth`

  constructor(
    private app: Application,
    private service: UserService
  ) {

    app.delete(UserController.pathWithId, async (req: Request, res: Response) => {
      const id = getParamsId(req)

      await this.service.deleteUser(id)
      res.status(204).send()
    })

    /**
    * @swagger
    * /user:
    *   get:
    *     summary: Lista todos os usuários
    *     tags: [Users]
    *     responses:
    *       200:
    *         description: Lista de usuários
    */
    app.get(UserController.pathWithId, async (req: Request, res: Response) => {
      const id = getParamsId(req)
      const user = await this.service.listUserById(id)
      res.send(user)
    })

    /**
   * @swagger
   * /user:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários
   */
    app.get(UserController.path + '-infos', async (req: Request, res: Response) => {
      if (!req.user) {
        throw new AppError('unauthorized', 401)
      }
      const user = await this.service.listUserById(req.user.sub)
      res.send(user)
    })


    /**
     * @swagger
     * /user:
     *   post:
     *     summary: Cria um usuário
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/UserInput'
     *     responses:
     *       201:
     *         description: Usuário criado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     */
    app.post(UserController.path, async (req: Request, res: Response) => {
      const data = new CreateUserDTO({
        ...req.body
      })

      const newUser = await this.service.registerUser(data)
      res.status(201).send(newUser)
    })

    app.post(UserController.authPath, async (req: Request, res: Response) => {
      const data = new UserAuthDTO({
        ...req.body
      })

      const token = await this.service.userAuth(data)
      res.status(200).send({ token })
    })

    app.patch(UserController.pathWithId, async (req: Request, res: Response) => {
      const data = new UpdateUserDTO({
        ...req.body
      })
      const userId = getParamsId(req)
      const newUser = await this.service.alterUser(userId, data)
      res.status(204).send(newUser)
    })

  }

}