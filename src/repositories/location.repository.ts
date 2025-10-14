import { FilterLocationType } from "../dtos/location/filter-location.dto";
import { ListLocationDTO } from "../dtos/location/list-location.dto";
import Location from "../models/location.model";
import { BaseRepository } from './base.repository';

export class LocationRepository extends BaseRepository<Location> {
  constructor() {
    super(Location)
  }

  async listById(id: number): Promise<Location | null> {
    const transaction = await this.Model.findByPk(
      id,
      {
        include: [
          {
            association: 'aisle',
            include: [ { association: 'warehouse' } ]
          },
          {
            association: 'stock',
            include: [
              {
                association: 'product'
              }
            ]
          }
        ],
      }
    )
    return transaction ? new ListLocationDTO(transaction).getAll() as Location : null
  }

  async listAll(filters?: FilterLocationType): Promise<Location[]> {

    const transactions = await this.Model.findAll({
      where: {
        ...filters
      },
      include: [
        {
          association: 'aisle',
          include: [ { association: 'warehouse' } ]
        }
      ],
      order: [ [ 'created_at', 'DESC' ], ]
    })

    const aux = transactions.map(transaction => {
      return new ListLocationDTO(transaction).getAll()
    })

    return aux as Location[]
  }
}