import { Attributes, WhereOptions } from "sequelize";
import { UserType } from "../dtos/user/user.schema";
import User from "../models/user.model";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<User> {

  constructor() {
    super(User)
  }

  // DEVE SER CHAMDA APENAS EM UserService.resetPassword
  async resetPassword(id: number, password: string): Promise<void> {
    await this.Model.update({ password }, { where: { id } })
  }

  async listById(id: number): Promise<User | null> {
    const user = await this.Model.findByPk(id, {
      include: { association: 'roles' }
    })
    return user
  }

  override async listAll(filters?: WhereOptions<Attributes<User>>): Promise<User[]> {
    const user = await this.Model.findAll({
      include: { association: 'roles' },
      where: {
        ...filters
      },
      order: [ [ 'created_at', 'DESC' ], ]
    })
    return user
  }

  async listUserByRegister(register: string): Promise<UserType | null> {
    const user = await this.Model.findOne({
      include: { association: 'roles' },
      where: {
        register
      }
    })
    return user
  }
}