import UserRole from '../models/user-role.model'
import { UserRoleRepository } from '../repositories/user-role.repository'
import { BaseService } from './base.service'


export class UserRolesService extends BaseService<UserRole> {
  constructor() {
    super(new UserRoleRepository())
  }
}