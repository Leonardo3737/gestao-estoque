import Product from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';
import { BaseService } from './base.service';

export class ProductService extends BaseService<Product> {
  constructor() {
    super(new ProductRepository())
  }
}