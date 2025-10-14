import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db-connection";
import { CategoryType } from "../dtos/category/category.schema";
import { CreateCategoryType } from "../dtos/category/create-category.dto";

class Category extends Model<CategoryType, CreateCategoryType> {
  declare id: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'category',
  underscored: true,
  paranoid: true
})


export default Category;