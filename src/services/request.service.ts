import { FilterRequestDTO } from '../dtos/request/filter-request.schema copy 2';
import { ListRequestDTO, ListRequestsType } from '../dtos/request/list-request.schema copy 3';
import { RequestType } from '../dtos/request/request.schema';
import { AppError } from '../errors/app.error';
import { RequestRepository } from "../repositories/request.repository";

export class RequestService {
  repository
  constructor() {
    this.repository = new RequestRepository()
  }

  async listById(id: number): Promise<RequestType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListRequestDTO(obj).getAll()
  }

  async listAll(filter?: FilterRequestDTO): Promise<ListRequestsType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }
}