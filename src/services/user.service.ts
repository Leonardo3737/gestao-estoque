import bcrypt from 'bcrypt'
import { InferAttributes } from "sequelize"
import { DTO } from "../dtos/dto"
import { ListUserByAdminDTO, ListUserByAdminType } from "../dtos/user/list-user.dto"
import { CreateUserType } from "../dtos/user/create-user.dto"
import { FilterUserType } from "../dtos/user/filter-user.dto"
import { UpdateUserType } from "../dtos/user/update-user.dto"
import { UserAuthDTO } from "../dtos/user/user-auth.dto"
import { AppError } from "../errors/app.error"
import User from "../models/user.model"
import { UserRepository } from "../repositories/user.repository"
import { encryptPassword } from "../utils/encrypt"
import { genJWT } from "../utils/jwt"
import { BaseService } from "./base.service"

// THIS SERVICE IS AVAILABLE ONLY FOR ADMIN
export class UserService extends BaseService<User> {

  constructor() {
    super(new UserRepository())
  }

  override async create(newUser: DTO<any>): Promise<ListUserByAdminType> {
    const user: CreateUserType = newUser.getAll()

    await this.checkConflict(user.phone, user.register)

    user.password = await encryptPassword(user.password)
    const res = await this.repository.create(user)
    return new ListUserByAdminDTO(res).getAll()
  }

  override async alter(userId: number, newUser: DTO<any>): Promise<void> {

    const user: UpdateUserType = newUser.getAll()

    await this.checkConflict(user.phone, user.register)

    await this.repository.alter(userId, user as Partial<InferAttributes<User>>)
  }


  override async listById(id: number): Promise<ListUserByAdminType> {
    const user = await this.repository.listById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userWithouPassword = new ListUserByAdminDTO(user)

    return userWithouPassword.getAll()
  }


  override async listAll(filters?: DTO<any>): Promise<ListUserByAdminType[]> {

    const auxFilter: FilterUserType = filters?.getAll()

    const users = await this.repository.listAll(auxFilter)

    if (!users) {
      throw new AppError('User not found', 404)
    }

    const userWithoutPassword = users.map(user => new ListUserByAdminDTO(user).getAll())

    return userWithoutPassword
  }

  async userAuth(auth: UserAuthDTO): Promise<string> {
    const user = await (this.repository as UserRepository).listUserByRegister(auth.get('register'))

    if (!user) {
      throw new AppError('user not found', 404)
    }

    const isAuth = bcrypt.compareSync(auth.get('password'), user.password)

    if (!isAuth) {
      throw new AppError('unauthorized', 401)
    }

    const token = genJWT({
      payload: user,
      expiresDay: 100
    })
    return token
  }

  private async checkConflict(phone?: string, register?: string) {
    if (phone) {
      const userWithSamephone = await this.repository.listAll({ phone })

      if (userWithSamephone?.length) {
        throw new AppError('There is already a user with this phone', 409)
      }
    }

    if (register) {
      const userWithSameRegister = await this.repository.listAll({ register })

      if (userWithSameRegister?.length) {
        throw new AppError('There is already a user with this register', 409)
      }
    }

  }
}