import { Attributes, DatabaseError, ForeignKeyConstraintError, InferAttributes, Model, ModelStatic, Transaction, UniqueConstraintError, ValidationError, WhereOptions } from 'sequelize';
import { AppError } from '../errors/app.error';

export abstract class BaseRepository<TModel extends Model> {

  constructor(protected Model: ModelStatic<TModel>) { }

  async alter(id: number, newData: Partial<InferAttributes<TModel>>, transaction?: Transaction): Promise<void> {
    const where = { id } as unknown as WhereOptions<Attributes<TModel>>
    await this.Model.update(newData, { where, ...(transaction ? { transaction } : {}) })
  }

  async create(newData: TModel[ '_creationAttributes' ], transaction?: Transaction): Promise<TModel> {
    try {
      const process = await this.Model.create(newData, (transaction ? { transaction } : {}))
      return process.dataValues
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

  async delete(id: number, transaction?: Transaction): Promise<void> {
    const where = { id } as unknown as WhereOptions<Attributes<TModel>>
    await this.Model.destroy({ where, ...(transaction ? { transaction } : {}) })
  }

  async listById(id: number): Promise<TModel | null> {
    const data = await this.Model.findByPk(id)
    return data
  }

  async listAll(filters?: WhereOptions<Attributes<TModel>>): Promise<TModel[]> {

    const datas = await this.Model.findAll({
      where: {
        ...filters
      },
      order: [ [ 'created_at', 'DESC' ], ],
    })
    return datas
  }
}