import { DataTypes, Model } from "sequelize";
import { WarehouseType } from "../dtos/warehouse/warehouse.schema";
import { CreateWarehouseType } from "../dtos/warehouse/create-warehouse.dto";
import sequelize from "../config/db-connection";

class Warehouse extends Model<WarehouseType, CreateWarehouseType> {
  declare id: number;
  declare name: string;
  declare address: string;
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date
}

Warehouse.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'warehouse',
  underscored: true,
  paranoid: true,
})

export default Warehouse;