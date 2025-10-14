import Aisle from '../models/aisle.model';
import { AisleRepository } from "../repositories/aisle.repository";
import { BaseService } from './base.service';

export class AisleService extends BaseService<Aisle> {
  constructor() {
    super(new AisleRepository())
  }
}