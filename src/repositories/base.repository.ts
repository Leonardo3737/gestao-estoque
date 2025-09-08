import { Attributes, InferAttributes, Model, ModelStatic, WhereOptions } from 'sequelize';
import { AppError } from '../errors/app.error';

export abstract class BaseRepository<TModel extends Model> {

  constructor(private Model: ModelStatic<TModel>) { }

  async alter(id: number, newRolesData: Partial<InferAttributes<TModel>>): Promise<void> {
    const where = { id } as unknown as WhereOptions<Attributes<TModel>>
    await this.Model.update(newRolesData, { where })
  }

  async create(newRoles: TModel['_creationAttributes']): Promise<object> {
    try {
      const process = await this.Model.create(newRoles)
      return process.dataValues
    }
    catch (err) {
      console.error('Erro ao criar role:', err);
      throw new AppError();
    }
  }

  async delete(id: number): Promise<void> {
    const where = { id } as unknown as WhereOptions<Attributes<TModel>>
    await this.Model.destroy({ where })
  }

  async listById(id: number): Promise<TModel | null> {
    const userRoles = await this.Model.findByPk(id)
    return userRoles
  }

  async listAll(filters?: WhereOptions<Attributes<TModel>>): Promise<TModel[] | null> {

    const roles = await this.Model.findAll({
      where: {
        ...filters
      }
    })
    return roles
  }
}