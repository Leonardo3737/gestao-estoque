import Request from '../models/request.model';
import { BaseRepository } from './base.repository';

export class RequestRepository extends BaseRepository<Request> {
  constructor() {
    super(Request)
  }
}