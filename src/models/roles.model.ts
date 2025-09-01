import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-connection';
import { CreateRolesType } from '../dtos/roles/create-roles.dto';
import { RolesType } from '../dtos/roles/roles.schema';
import { RolesEnum } from '../enums/roles.enum';

export class Roles extends Model<RolesType, CreateRolesType> {
  declare id: number;
  declare role: RolesEnum;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Roles.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'MANAGER', 'OPERATOR'),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'roles',
  underscored: true
})