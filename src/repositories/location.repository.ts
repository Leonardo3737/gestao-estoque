import Location from "../models/location.model";
import { BaseRepository } from './base.repository';

export class LocationRepository extends BaseRepository<Location> {
  constructor() {
    super(Location)
  }
}