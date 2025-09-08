import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-connection';
import { CreateUserRoleType } from '../dtos/user-role/create-user-role.dto';
import { RolesEnum } from '../enums/roles.enum';
import { UserRoleType } from '../dtos/user-role/user-role.schema';
import User from './user.model';

class UserRole extends Model<UserRoleType, CreateUserRoleType> {
  declare id: number;
  declare role: RolesEnum;
  declare userId: number;
  declare createdAt: Date;
  declare updatedAt: Date;
}

UserRole.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'MANAGER', 'OPERATOR'),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'user_role',
  underscored: true
})

UserRole.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

User.hasMany(UserRole, {
  foreignKey: 'user_id',
  as: 'roles'
});

export default UserRole