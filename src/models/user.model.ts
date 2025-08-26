import { DataTypes, Model } from "sequelize";
import { UserType } from "../dto/user/user.schema";
import { CreateUserType } from "../dto/user/create-user.dto";
import sequelize from "../config/db-connection";


class User extends Model<UserType, CreateUserType> {
  declare id: number;
  declare name: string;
  declare phone: string;
  declare register: string;
  declare password: string;
  declare createdAt: Date;
  declare updatedAt: Date;
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
}, {
  sequelize,
  tableName: 'user',
  underscored: true
})

export default User