import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { UserType } from "../dtos/user/user.schema";
import { CreateUserType } from "../dtos/user/create-user.dto";
import { UserRoleType } from "../dtos/user-role/user-role.schema";


class User extends Model<UserType, CreateUserType> {
  declare id: number;
  declare name: string;
  declare phone: string;
  declare register: string;
  declare password: string;
  declare roles: UserRoleType[];
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  register: {
    type: DataTypes.CHAR(11),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'user',
  underscored: true,
  paranoid: true,
})

export default User