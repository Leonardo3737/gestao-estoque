import { CreateProductDTO } from '../dtos/product/create-product.dto';
import { FilterProductDTO } from '../dtos/product/filter-product.dto';
import { ListProductDTO, ListProductsType, ListProductType } from '../dtos/product/list-product.dto';
import { UpdateProductDTO } from '../dtos/product/update-product.dto';
import { AppError } from '../errors/app.error';
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
  repository
  constructor() {
    this.repository = new ProductRepository()
  }

  async create(dto: CreateProductDTO): Promise<ListProductType> {
    const obj = dto.getAll()
    const newProduct = await this.repository.create(obj)
    return new ListProductDTO(newProduct).getAll()
  }

  async alter(id: number, dto: UpdateProductDTO): Promise<void> {
    const obj = dto.getAll()
    await this.listById(id)
    await this.repository.alter(id, obj)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListProductType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListProductDTO(obj).getAll()
  }

  async listAll(filter?: FilterProductDTO): Promise<ListProductsType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }

  async getkpi() {
    return await this.repository.getKpi()
  }

  async getKpiByWarehouse(warehouseId: number) {
    return await this.repository.getKpiByWarehouse(warehouseId)
  }
}