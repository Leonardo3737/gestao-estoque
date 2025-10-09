import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { AisleType } from "../dtos/aisle/aisle.schema";
import { CreateAisleType } from "../dtos/aisle/create-aisle.dto";
import Warehouse from './warehouse.model';
import { WarehouseType } from "../dtos/warehouse/warehouse.schema";

class Aisle extends Model<AisleType, CreateAisleType> {
  declare id: number;
  declare name: string;
  declare warehouseId: number;
  declare warehouse: WarehouseType;
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date
}

Aisle.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  warehouseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'aisle',
  underscored: true,
  paranoid: true
})

Aisle.belongsTo(Warehouse, {
  foreignKey: 'warehouseId',
  as: 'warehouse'
});

Warehouse.hasMany(Aisle, {
  foreignKey: 'warehouseId',
  as: 'aisle'
});

export default Aisle;