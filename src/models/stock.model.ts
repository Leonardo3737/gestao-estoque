import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { LocationType } from '../dtos/location/location.schema';
import { ProductType } from '../dtos/product/product.schema';
import { CreateStockType } from '../dtos/stock/create-stock.dto';
import { StockType } from "../dtos/stock/stock.schema";
import Location from './location.model';
import Product from './product.model';

class Stock extends Model<StockType, CreateStockType> {
  declare id: number;
  declare productId: number;
  declare product: ProductType;
  declare locationId: number;
  declare location: LocationType;
  declare currentStock: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

Stock.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  currentStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'product_location',
  underscored: true,
  paranoid: true,
  indexes: [
    {
      unique: true,
      fields: [ 'product_id', 'location_id' ]
    }
  ]
})

Stock.belongsTo(Product, {
  foreignKey: 'product_id',
  as: 'product'
});

Product.hasMany(Stock, {
  foreignKey: 'product_id',
  as: 'stock'
});

Stock.belongsTo(Location, {
  foreignKey: 'location_id',
  as: 'location'
});

Location.hasMany(Stock, {
  foreignKey: 'location_id',
  as: 'stock'
});

export default Stock;