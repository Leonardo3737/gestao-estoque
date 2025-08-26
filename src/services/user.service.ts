import { AppError } from "../errors/app.error"
import { CreateUserDTO } from "../dtos/user/create-user.dto"
import { ListUserDTO, ListUserType } from "../dtos/user/list-user.dto"
import { UserAuthDTO, UserAuthType } from "../dtos/user/user-auth.dto"
import { UserRepository } from "../repositories/user.repository"
import { encryptPassword } from "../utils/encrypt"
import bcrypt from 'bcrypt'
import { genJWT } from "../utils/jwt"
import { UpdateUserDTO } from "../dtos/user/update-user.dto"

export class UserService {

  constructor(
    private repository: UserRepository,
  ) { }

  async registerUser(newUser: CreateUserDTO): Promise<ListUserType> {

    const user = newUser.getAll()

    await this.checkConflict(user.phone, user.register)

    user.password = await encryptPassword(user.password)

    return await this.repository.createUser(user)
  }

  async alterUser(userId: number, newUser: UpdateUserDTO): Promise<void> {

    const user = newUser.getAll()

    await this.checkConflict(user.phone, user.register)

    await this.repository.alterUser(userId, user)
  }

  async deleteUser(id: number): Promise<void> {
    await this.listUserById(id)
    await this.repository.deleteUser(id)
  }

  async listUserById(id: number): Promise<ListUserType> {
    const user = await this.repository.listUserById(id)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const userWithouPassword = new ListUserDTO(user)

    return userWithouPassword.getAll()
  }

  async userAuth(auth: UserAuthDTO): Promise<string> {
    const user = await this.repository.listUserByRegister(auth.get('register'))

    if (!user) {
      throw new AppError('user not found', 404)
    }

    const isAuth = bcrypt.compareSync(auth.get('password'), user.password)

    if (!isAuth) {
      throw new AppError('unauthorized', 401)
    }

    const token = genJWT({
      payload: user,
      expiresDay: 7
    })
    return token
  }

  private async checkConflict(phone?: string, register?: string) {
    if (phone) {
      const userWithSamephone = await this.repository.listUser({ phone })

      if (userWithSamephone?.length){        
        throw new AppError('There is already a user with this phone', 409)
      }
    }
    
    if (register) {
      const userWithSameRegister = await this.repository.listUser({ register })
      
      if (userWithSameRegister?.length) {
        throw new AppError('There is already a user with this register', 409)
      }
    }

  }
}