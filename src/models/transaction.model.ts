import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db-connection';
import { CreateTransactionType } from '../dtos/transaction/create-transaction.dto';
import { RolesEnum } from '../enums/roles.enum';
import { TransactionType } from '../dtos/transaction/transaction.schema';
import User from './user.model';
import { TransactionTypeEnum } from '../enums/transaction-type.enum';
import { ListUserType } from '../dtos/user/list-user.dto';
import { ProductType } from '../dtos/product/product.schema';
import Product from './product.model';

class Transaction extends Model<TransactionType, CreateTransactionType> {
  declare id: number;
  declare type: TransactionTypeEnum;
  declare userId: number;
  declare user: ListUserType;
  declare productId: number;
  declare product: ProductType;
  declare quantity: number;
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
  quantity: {
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

export default Transaction