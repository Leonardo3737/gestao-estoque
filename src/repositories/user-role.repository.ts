import UserRole from '../models/user-role.model';
import { BaseRepository } from './base.repository';

export class UserRoleRepository extends BaseRepository<UserRole> {
  constructor() {
    super(UserRole)
  }
}