import Product from "../models/product.model";
import { BaseRepository } from './base.repository';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product)
  }
}