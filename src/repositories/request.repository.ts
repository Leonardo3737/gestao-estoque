import { WhereOptions } from 'sequelize';
import { ListRequestDTO, ListRequestsType, ListRequestType } from '../dtos/request/list-request.schema copy 3';
import Request from '../models/request.model';
import { cleanObject } from '../utils/cleanObject';

export class RequestRepository {

  async listById(id: number): Promise<ListRequestType | null> {
    const request = await Request.findByPk(
      id,
      {
        include: [
          {
            association: 'user',
            include: [{ association: 'roles' }]
          }
        ]
      }
    )
    return request ? new ListRequestDTO(request).getAll() : null
  }

  async listAll(filters?: any): Promise<ListRequestsType> {

    const page = filters?.page ?? 1
    const perPage = filters?.perPage ?? 10

    delete filters?.page
    delete filters?.perPage
    delete filters?.search

    const where: WhereOptions<Request> = { ...cleanObject(filters || {}) }

    // Conta total de registros
    const count = await Request.count({ where })

    const results = await Request.findAll({
      where,
      include: [
        {
          association: 'user',
          include: [{ association: 'roles' }]
        }
      ],
      order: [['created_at', 'DESC'],],
      offset: (page - 1) * perPage,
      limit: perPage
    })

    const data = results.map(item => new ListRequestDTO(item).getAll())

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
}