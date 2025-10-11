import { FilterProductType } from '../dtos/product/filter-product.dto';
import { ListProductDTO } from '../dtos/product/list-product.dto';
import Product from "../models/product.model";
import { BaseRepository } from './base.repository';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product)
  }

  async listById(id: number): Promise<Product | null> {
    const product = await Product.findByPk(
      id,
      {
        include: [
          { association: 'category' },
          {
            association: 'stock',
            include: [
              { association: 'location' }
            ]
          }
        ]
      }
    )
    return product ? new ListProductDTO(product).getAll() as Product : null
  }

  async listAll(filters?: FilterProductType): Promise<Product[]> {

    const products = await Product.findAll({
      where: {
        ...filters
      },
      include: [ { association: 'category' } ],
      order: [ [ 'created_at', 'DESC' ], ]
    })

    const aux = products.map(product => {
      return new ListProductDTO(product).getAll()
    })

    return aux as Product[]
  }
}