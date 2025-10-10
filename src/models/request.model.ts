import sequelize from "../config/db-connection";
import { DataTypes, Model } from "sequelize";
import { RequestType, CreateRequestType } from "../dtos/request/request.schema";

class Request extends Model<RequestType, CreateRequestType> {
  declare id: number
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
      field: "status_code",
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
      field: "ip_address",
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

export default Request;