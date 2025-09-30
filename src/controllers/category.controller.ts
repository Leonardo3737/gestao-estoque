import { Application } from "express";
import { BaseController, EndPointType } from "./base.controller";
import Category from '../models/category.model';
import { getParamsId } from '../utils/get-params-id';
import { CreateCategoryDTO } from "../dtos/category/create-category.dto";
import { FilterCategoryDTO } from "../dtos/category/filter-category.dto";
import { CategoryService } from "../services/category.service";
import { UpdateCategoryDTO } from "../dtos/category/update-category.dto";


export class CategoryController extends BaseController<Category, CategoryService> {
  constructor(app: Application) {
    super({
      app,
      service: new CategoryService()
    })
  }

  protected basePath(): string {
    return "/category"
  }

  protected operatorEndPoints(): EndPointType[] {
    return [
      {
        path: "/",
        method: "post",
        handle: async (req, res) => {
          const data = new CreateCategoryDTO(req.body)
          const category = await this.service.create(data)
          res.status(201).send(category)
        }
      },
      {
        path: '/',
        method: 'get',
        handle: async (req, res) => {
          const filters = new FilterCategoryDTO(req.query)

          const category = await this.service.listAll(filters)
          res.status(200).send(category)
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
          const data = new UpdateCategoryDTO(req.body)
          const id = getParamsId(req)
          await this.service.alter(id, data)
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