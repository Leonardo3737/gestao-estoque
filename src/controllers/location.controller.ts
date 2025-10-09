import { Application } from 'express-serve-static-core'
import { CreateLocationDTO } from '../dtos/location/create-location.dto'
import { FilterLocationDTO } from '../dtos/location/filter-location.dto'
import { UpdateLocationDTO } from '../dtos/location/update-location.dto'
import { LocationService } from '../services/location.service'
import { getParamsId } from '../utils/get-params-id'
import { BaseController, EndPointType } from './base.controller'
import Location from '../models/location.model'


export class LocationController extends BaseController<Location, LocationService> {
  constructor(app: Application) {
    super({
      app,
      service: new LocationService()
    })
  }

  protected basePath(): string {
    return "/location"
  }

  protected managerEndPoints(): EndPointType[] {
    return [ {
      path: "/",
      method: "post",
      handle: async (req, res) => {
        const data = new CreateLocationDTO(req.body)
        const Location = await this.service.create(data)
        res.status(201).send(Location)
      }
    },
    {
      path: '/',
      method: 'get',
      handle: async (req, res) => {
        const filters = new FilterLocationDTO(req.query)

        const Location = await this.service.listAll(filters)
        res.status(200).send(Location)
      }
    },
    {
      path: '/:id',
      method: 'get',
      handle: async (req, res) => {
        const locationId = getParamsId(req)
        const location = await this.service.listById(locationId)
        res.status(200).send(location)
      }
    },
    {
      path: '/:id',
      method: 'patch',
      handle: async (req, res) => {
        const data = new UpdateLocationDTO(req.body)
        const Location = getParamsId(req)
        await this.service.alter(Location, data)
        res.status(204).send()
      }
    },
    {
      path: '/:id',
      method: 'delete',
      handle: async (req, res) => {
        const id = getParamsId(req)
        await this.service.delete(id)
        res.status(204).send()
      }
    },
    ]
  }

} 