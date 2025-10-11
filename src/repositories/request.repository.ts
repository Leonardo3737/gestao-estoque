import { RequestDTO } from '../dtos/request/request.schema';
import Request from '../models/request.model';
import { BaseRepository } from './base.repository';

export class RequestRepository extends BaseRepository<Request> {
  constructor() {
    super(Request)
  }

  async listById(id: number): Promise<Request | null> {
    const request = await Request.findByPk(
      id,
      {
        include: [
          {
            association: 'user',
            include: [ { association: 'roles' } ]
          }
        ]
      }
    )
    return request ? new RequestDTO(request).getAll() as Request : null
  }

  async listAll(filters?: any): Promise<Request[]> {

    const requesties = await Request.findAll({
      where: {
        ...filters
      },
      include: [
        {
          association: 'user',
          include: [ { association: 'roles' } ]
        }
      ],
      order: [ [ 'created_at', 'DESC' ], ]
    })

    const aux = requesties.map(request => {
      return new RequestDTO(request).getAll()
    })

    return aux as Request[]
  }
}