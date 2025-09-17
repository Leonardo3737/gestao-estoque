import Aisle from "../models/aisle.model";
import { BaseRepository } from './base.repository';

export class AisleRepository extends BaseRepository<Aisle> {
  constructor() {
    super(Aisle)
  }
}