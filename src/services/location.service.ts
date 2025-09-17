import Location from '../models/location.model';
import { LocationRepository } from '../repositories/location.repository';

import { BaseService } from './base.service';

export class LocationService extends BaseService<Location> {
  constructor() {
    super(new LocationRepository())
  }
}