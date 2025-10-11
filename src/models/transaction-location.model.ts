import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { LocationType } from "../dtos/location/location.schema";
import { CreateTransactionLocationType } from "../dtos/transaction-location/create-transaction-location.dto";
import { TransactionLocationType } from "../dtos/transaction-location/transaction-location.schema";
import { TransactionType } from "../dtos/transaction/transaction.schema";
import Location from "./location.model";
import Transaction from "./transaction.model";

class TransactionLocation extends Model<TransactionLocationType, CreateTransactionLocationType> {
  declare id: number;
  declare locationId: number;
  declare location: LocationType;
  declare transactionId: number;
  declare transaction: TransactionType;
  declare quantity: number;
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date
}

TransactionLocation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transactionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'transaction_location',
  underscored: true,
  paranoid: true
})

TransactionLocation.belongsTo(Location, {
  foreignKey: 'locationId',
  as: 'location'
});

Location.hasMany(TransactionLocation, {
  foreignKey: 'locationId',
  as: 'transactionLocations'
});

TransactionLocation.belongsTo(Transaction, {
  foreignKey: 'transactionId',
  as: 'transaction'
});

Transaction.hasMany(TransactionLocation, {
  foreignKey: 'transactionId',
  as: 'transactionLocations'
});

export default TransactionLocation;