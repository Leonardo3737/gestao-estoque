import { col, fn, literal, Op } from 'sequelize';
import { FilterProductType } from '../dtos/product/filter-product.dto';
import { ListProductDTO } from '../dtos/product/list-product.dto';
import Product from "../models/product.model";
import { BaseRepository } from './base.repository';
import { KpiSchema, KpiType } from '../dtos/kpi/kpi.schema';
import Stock from '../models/stock.model';

export class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product)
  }

  async listById(id: number): Promise<Product | null> {
    const product = await this.Model.findByPk(
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

    const products = await this.Model.findAll({
      where: {
        ...filters
      },
      include: [{ association: 'category' }],
      order: [['created_at', 'DESC'],]
    })

    const aux = products.map(product => {
      return new ListProductDTO(product).getAll()
    })

    return aux as Product[]
  }

  async getKpi(): Promise<KpiType> {
    const data = await Promise.all([
      this.Model.sum('currentStock'),
      this.Model.count(),
      this.Model.count({
        where: {
          currentStock: {
            [Op.lt]: col('minimum_stock'),
          },
        },
      }),
      this.Model.count({
        where: {
          expirationDate: {
            [Op.between]: [
              fn('NOW'),
              literal("NOW() + INTERVAL '1 month'")
            ]
          }
        }
      })
    ])

    const kpi = KpiSchema.parse({
      totalStock: data[0],
      totalProduct: data[1],
      belowMinimumStock: data[2],
      closeToTheExpirationDate: data[3],
    })
    return kpi
  }

  async getKpiByWarehouse(warehouseId: number): Promise<KpiType> {
    const data = await Promise.all([
      // totalStock:
      await Stock.findOne({
        attributes: [[fn('SUM', col('current_stock')), 'total_stock']],
        include: [
          {
            association: 'location',
            attributes: [],
            required: true, // 🔥 transforma em INNER JOIN
            include: [
              {
                association: 'aisle',
                attributes: [],
                required: true,
                include: [
                  {
                    association: 'warehouse',
                    attributes: [],
                    required: true,
                    where: { id: warehouseId },
                  },
                ],
              },
            ],
          },
        ],
        raw: true,
      }) as unknown as { total_stock: number | null },

      // totalProduct
      await Product.findAll({
        include: [
          {
            association: 'stock',
            required: true,
            include: [
              {
                association: 'location',
                required: true,
                include: [
                  {
                    association: 'aisle',
                    required: true,
                    include: [
                      {
                        association: 'warehouse',
                        required: true,
                        where: { id: warehouseId },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),

      // belowMinimumStock
      await this.Model.findAll({
        where: {
          currentStock: {
            [Op.lt]: col('minimum_stock'),
          },
        },
        include: [
          {
            association: 'stock',
            required: true,
            include: [
              {
                association: 'location',
                required: true,
                include: [
                  {
                    association: 'aisle',
                    required: true,
                    include: [
                      {
                        association: 'warehouse',
                        required: true,
                        where: { id: warehouseId },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),


      // closeToTheExpirationDate:
      await Product.findAll({
        where: {
          expirationDate: {
            [Op.between]: [
              fn('NOW'),
              literal("NOW() + INTERVAL '1 month'")
            ]
          }
        },
        include: [
          {
            association: 'stock',
            required: true,
            include: [
              {
                association: 'location',
                required: true,
                include: [
                  {
                    association: 'aisle',
                    required: true,
                    include: [
                      {
                        association: 'warehouse',
                        required: true,
                        where: { id: warehouseId },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }),
    ])

    const kpi = KpiSchema.parse({
      totalStock: data[0]?.total_stock ?? 0,
      totalProduct: data[1]?.length ?? 0,
      belowMinimumStock: data[2]?.length ?? 0,
      closeToTheExpirationDate: data[3]?.length ?? 0,
    })
    return kpi
  }
}