import { CreateUserRoleDTO } from '../dtos/user-role/create-user-role.dto';
import { FilterUserRoleDTO } from '../dtos/user-role/filter-user-role.dto';
import { ListUserRoleDTO, ListUserRolesType, ListUserRoleType } from '../dtos/user-role/list-user-role.dto';
import { UpdateUserRoleDTO } from '../dtos/user-role/update-user-role.dto';
import { AppError } from '../errors/app.error';
import { UserRoleRepository } from "../repositories/user-role.repository";

export class UserRoleService {
  repository
  constructor() {
    this.repository = new UserRoleRepository()
  }

  async create(dto: CreateUserRoleDTO): Promise<ListUserRoleType> {
    const obj = dto.getAll()
    const newUserRole = await this.repository.create(obj)
    return new ListUserRoleDTO(newUserRole).getAll()
  }

  async alter(id: number, dto: UpdateUserRoleDTO): Promise<void> {
    const obj = dto.getAll()
    await this.listById(id)
    await this.repository.alter(id, obj)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListUserRoleType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListUserRoleDTO(obj).getAll()
  }

  async listAll(filter?: FilterUserRoleDTO): Promise<ListUserRolesType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }
}