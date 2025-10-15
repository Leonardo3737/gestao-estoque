import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-connection';
import { ProductType } from '../dtos/product/product.schema';
import { TransactionLocationType } from '../dtos/transaction-location/transaction-location.schema';
import { CreateTransactionType } from '../dtos/transaction/create-transaction.dto';
import { TransactionType } from '../dtos/transaction/transaction.schema';
import { ListUserType } from '../dtos/user/list-user.dto';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import Product from './product.model';
import User from './user.model';
import { WarehouseType } from '../dtos/warehouse/warehouse.schema';
import Warehouse from './warehouse.model';

class Transaction extends Model<TransactionType, CreateTransactionType> {
  declare id: number;
  declare type: TransactionTypeEnum;
  declare userId: number;
  declare user: ListUserType;
  declare productId: number;
  declare product: ProductType;
  declare transactionLocations: TransactionLocationType[];
  declare warehouseId: number;
  declare warehouse: WarehouseType;
  declare date: Date;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

Transaction.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('INCOMING', 'OUTGOING'),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  warehouseId: {
    defaultValue: 1,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
}, {
  sequelize,
  tableName: 'transaction',
  underscored: true,
  paranoid: true
})

Transaction.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

User.hasMany(Transaction, {
  foreignKey: 'user_id',
  as: 'transactions'
});

Transaction.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

Product.hasMany(Transaction, {
  foreignKey: 'product_id',
  as: 'transactions'
});

Transaction.belongsTo(Warehouse, {
  foreignKey: 'warehouse_id',
  as: 'warehouse'
});

Warehouse.hasMany(Transaction, {
  foreignKey: 'warehouse_id',
  as: 'transactions'
});

export default Transaction