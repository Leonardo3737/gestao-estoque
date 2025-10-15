import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import { getParamsId } from '../utils/get-params-id';
import { CreateProductDTO } from "../dtos/product/create-product.dto";
import { FilterProductDTO } from "../dtos/product/filter-product.dto";
import { ProductService } from "../services/product.service";
import { UpdateProductDTO } from "../dtos/product/update-product.dto";


export class ProductController extends BaseController<ProductService> {
  constructor(app: Application) {
    super({
      app,
      service: new ProductService()
    })
  }

  protected basePath(): string {
    return "/product"
  }

  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: "/kpi",
        method: "get",
        handle: async (req, res) => {
          const kpi = await this.service.getkpi()
          res.status(200).send(kpi)
        }
      },
      {
        path: "/kpi/:id",
        method: "get",
        handle: async (req, res) => {
          const warehouseId = getParamsId(req)
          const kpi = await this.service.getKpiByWarehouse(warehouseId)
          res.status(200).send(kpi)
        }
      },
      {
        path: "/",
        method: "post",
        handle: async (req, res) => {
          const data = new CreateProductDTO(req.body)
          const product = await this.service.create(data)
          res.status(201).send(product)
        }
      },
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterProductDTO(req.query)

          const product = await this.service.listAll(filters)
          res.status(200).send(product)
        }
      },
      {
        path: '/:id',
        method: 'get',
        handle: async (req, res) => {
          const id = getParamsId(req)
          const category = await this.service.listById(id)
          res.status(200).send(category)
        }
      },
      {
        path: '/:id',
        method: 'patch',
        handle: async (req, res) => {
          const data = new UpdateProductDTO(req.body)
          const product = getParamsId(req)
          await this.service.alter(product, data)
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