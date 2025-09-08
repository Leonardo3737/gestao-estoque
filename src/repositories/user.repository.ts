import { UserType } from "../dtos/user/user.schema";
import User from "../models/user.model";
import { BaseRepository } from "./base.repository";
import { Attributes, WhereOptions } from "sequelize";

export class UserRepository extends BaseRepository<User> {

  constructor() {
    super(User)
  }

  // DEVE SER CHAMDA APENAS EM UserService.resetPassword
  async resetPassword(id: number, password: string): Promise<void> {
    await User.update({ password }, { where: { id } })
  }

  async listById(id: number): Promise<User | null> {
    const user = await User.findByPk(id, {
      include: { association: 'roles' }
    })
    return user
  }

  override async listAll(filters?: WhereOptions<Attributes<User>>): Promise<User[] | null> {
    const user = await User.findAll({
      include: { association: 'roles' },
      where: {
        ...filters
      }
    })
    return user
  }

  async listUserByRegister(register: string): Promise<UserType | null> {
    const user = await User.findOne({
      include: { association: 'roles' },
      where: {
        register
      }
    })
    return user
  }
}