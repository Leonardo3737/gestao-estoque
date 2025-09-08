import { DataTypes, Model } from "sequelize";
import { WarehouseType } from "../dtos/warehouse/warehouse.schema";
import { CreateWarehouseType } from "../dtos/warehouse/create-warehouse.dto";
import sequelize from "../config/db-connection";

class Warehouse extends Model<WarehouseType, CreateWarehouseType> {
  declare id: number;
  declare name: string;
  declare address: string;
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
}, {
  sequelize,
  tableName: 'warehouse',
  underscored: true
})

export default Warehouse;