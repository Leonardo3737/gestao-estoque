import Request from '../models/request.model'
import { RequestRepository } from '../repositories/request.repository'
import { BaseService } from './base.service'


export class RequestService extends BaseService<Request> {
  constructor() {
    super(new RequestRepository())
  }
}