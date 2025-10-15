import { col, DatabaseError, fn, ForeignKeyConstraintError, literal, Op, Transaction, UniqueConstraintError, ValidationError, WhereOptions } from 'sequelize';
import { FilterProductType } from '../dtos/product/filter-product.dto';
import { ListProductDTO, ListProductsType, ListProductType } from '../dtos/product/list-product.dto';
import Product from "../models/product.model";
import { KpiSchema, KpiType } from '../dtos/kpi/kpi.schema';
import Stock from '../models/stock.model';
import { cleanObject } from '../utils/cleanObject';
import { UpdateProductType } from '../dtos/product/update-product.dto';
import { CreateProductType } from '../dtos/product/create-product.dto';
import { AppError } from '../errors/app.error';

export class ProductRepository {

  async listById(id: number): Promise<ListProductType | null> {
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
    return product ? new ListProductDTO(product).getAll() : null
  }

  async listAll(filters?: FilterProductType): Promise<ListProductsType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10
    const search = filters?.search?.trim() ?? ''

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<Product> = { ...cleanObject(filters || {}) }

    if (search) {
      where.name = { [Op.iLike]: `%${search}%` }
    }

    const count = await Product.count({ where })


    const products = await Product.findAll({
      where,
      include: [{ association: 'category' }],
      order: [['created_at', 'DESC'],],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = products.map(product => new ListProductDTO(product).getAll())

    const lastPage = Math.ceil(count / perPage)
    const hasMore = page < lastPage
    const from = count > 0 ? (page - 1) * perPage + 1 : 0
    const to = Math.min(page * perPage, count)

    return {
      data,
      meta: {
        page,
        count,
        perPage,
        hasMore,
        lastPage,
        from,
        to
      }
    }
  }

  async getKpi(): Promise<KpiType> {
    const data = await Promise.all([
      Product.sum('currentStock'),
      Product.count(),
      Product.count({
        where: {
          currentStock: {
            [Op.lt]: col('minimum_stock'),
          },
        },
      }),
      Product.count({
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
      await Product.findAll({
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



  async alter(id: number, newData: UpdateProductType, dbTransaction?: Transaction) {
    await Product.update(cleanObject(newData), { where: { id }, ...(dbTransaction ? { transaction: dbTransaction } : {}) })
  }

  async create(newData: CreateProductType): Promise<Product> {
    try {
      const process = await Product.create(newData)
      return process
    }
    catch (err) {
      if (err instanceof ForeignKeyConstraintError) {
        throw new AppError("Invalid foreign key: related record does not exist.", 400);
      } else if (err instanceof UniqueConstraintError) {
        throw new AppError("Duplicate value: this value must be unique.", 400);
      } else if (err instanceof ValidationError) {
        const messages = err.errors.map(e => e.message).join(", ");
        throw new AppError(`Validation error: ${messages}`, 400);
      } else if (err instanceof DatabaseError) {
        console.error(err);
        throw new AppError("Internal database error.", 500);
      } else {
        console.error(err);
        throw new AppError("Unexpected error occurred.", 500);
      }
    }
  }

  async delete(id: number) {
    await Product.destroy({ where: { id } })
  }
}