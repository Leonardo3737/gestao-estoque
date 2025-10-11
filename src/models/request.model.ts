import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { CreateRequestType, RequestType } from "../dtos/request/request.schema";
import { AdminListUserType } from '../dtos/user/admin-list-user.dto';
import User from './user.model';

class Request extends Model<RequestType, CreateRequestType> {
  declare id: number
  declare userId: number
  declare user?: AdminListUserType
  declare method: string
  declare endpoint: string
  declare statusCode: number
  declare body: Record<string, unknown>
  declare response: Record<string, unknown>
  declare ipAddress: string
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date
}

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    method: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    endpoint: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    body: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    response: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "request",
    underscored: true,
    paranoid: true
  }
);

Request.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})

User.hasMany(Request, {
  foreignKey: 'user_id',
  as: 'requests'
})

export default Request;