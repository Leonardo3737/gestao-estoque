import Product from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';
import { BaseService } from './base.service';

export class ProductService extends BaseService<Product> {
  constructor() {
    super(new ProductRepository())
  }

  async getkpi() {
    return await (this.repository as ProductRepository).getKpi()
  }

  async getKpiByWarehouse(warehouseId: number) {
    return await (this.repository as ProductRepository).getKpiByWarehouse(warehouseId)
  }
}