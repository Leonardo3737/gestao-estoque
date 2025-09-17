import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { AisleType } from "../dtos/aisle/aisle.schema";
import { CreateAisleType } from "../dtos/aisle/create-aisle.dto";
import Warehouse from './warehouse.model';

class Aisle extends Model<AisleType, CreateAisleType> {
  declare id: number;
  declare name: string;
  declare warehouseId: number;
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
}, {
  sequelize,
  tableName: 'aisle',
  underscored: true
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