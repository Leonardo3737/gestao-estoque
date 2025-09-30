import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import Warehouse from './warehouse.model';
import { ProductType } from "../dtos/product/product.schema";
import { CreateProductType } from "../dtos/product/create-product.dto";
import Location from "./location.model";
import Category from "./category.model";

class Product extends Model<ProductType, CreateProductType> {
  declare id: number;
  declare name: string;
  declare description: string
  declare categoryId: number
  declare currentStock: number
  declare expirationDate: Date
  declare locationId: number
  declare createdAt: Date
  declare updatedAt: Date
  declare deletedAt: Date
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentStock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'product',
  underscored: true,
  paranoid: true
})

Product.belongsTo(Location, {
  foreignKey: 'locationId',
  as: 'location'
});

Location.hasMany(Product, {
  foreignKey: 'locationId',
  as: 'products'
});

Product.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

export default Product;