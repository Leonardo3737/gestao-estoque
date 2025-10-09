import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import Aisle from './aisle.model';
import { LocationType } from '../dtos/location/location.schema';
import { CreateLocationType } from '../dtos/location/create-location.dto';
import { AisleType } from "../dtos/aisle/aisle.schema";
import { TransactionLocationType } from "../dtos/transaction-location/transaction-location.schema";


class Location extends Model<LocationType, CreateLocationType> {
  declare id: number;
  declare shelf: string;
  declare side: string;
  declare aisleId: number;
  declare aisle: AisleType;
  declare transactionLocations: TransactionLocationType[];
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date
}

Location.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  shelf: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  side: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  aisleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'location',
  underscored: true,
  paranoid: true
})

Location.belongsTo(Aisle, {
  foreignKey: 'aisleId',
  as: 'aisle'
});

Aisle.hasMany(Location, {
  foreignKey: 'aisleId',
  as: 'location'
});

export default Location;