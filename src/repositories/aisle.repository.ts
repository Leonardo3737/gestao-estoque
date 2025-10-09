import { FilterAisleType } from "../dtos/aisle/filter-aisle.dto";
import { ListAisleDTO } from "../dtos/aisle/list-aisle.dto";
import Aisle from "../models/aisle.model";
import { BaseRepository } from './base.repository';

export class AisleRepository extends BaseRepository<Aisle> {
  constructor() {
    super(Aisle)
  }

  async listById(id: number): Promise<Aisle | null> {
    const transaction = await Aisle.findByPk(
      id,
      {
        include: [{ association: 'warehouse' }]
      }
    )
    return transaction ? new ListAisleDTO(transaction).getAll() as Aisle : null
  }

  async listAll(filters?: FilterAisleType): Promise<Aisle[]> {

    const transactions = await Aisle.findAll({
      where: {
        ...filters
      },
      include: [{ association: 'warehouse' }]
    })

    const aux = transactions.map(transaction => {
      return new ListAisleDTO(transaction).getAll()
    })

    return aux as Aisle[]
  }
}