import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import Product from '../models/product.model';
import { getParamsId } from '../utils/get-params-id';
import { CreateProductDTO } from "../dtos/product/create-product.dto";
import { FilterProductDTO } from "../dtos/product/filter-product.dto";
import { ProductService } from "../services/product.service";
import { UpdateProductDTO } from "../dtos/product/update-product.dto";


export class ProductController extends BaseController<Product, ProductService> {
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