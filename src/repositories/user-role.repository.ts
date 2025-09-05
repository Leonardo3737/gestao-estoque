import { CreateUserRoleType } from '../dtos/user-role/create-user-role.dto';
import { FilterUserRoleType } from '../dtos/user-role/filter-user-role.dto';
import { ListUserRoleDTO, ListUserRoleType } from '../dtos/user-role/list-user-role.dto';
import { UserRoleType } from '../dtos/user-role/user-role.schema';
import { AppError } from '../errors/app.error';
import UserRole from '../models/user-role.model';
import { BaseRepository } from './base.repository';

export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor() {
    super(UserRole)
  }
}