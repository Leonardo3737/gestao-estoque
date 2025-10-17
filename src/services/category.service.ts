import { CreateCategoryDTO } from '../dtos/category/create-category.dto';
import { FilterCategoryDTO } from '../dtos/category/filter-category.dto';
import { ListCategoriesType, ListCategoryDTO, ListCategoryType } from '../dtos/category/list-category.dto';
import { UpdateCategoryDTO } from '../dtos/category/update-category.dto';
import { AppError } from '../errors/app.error';
import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  repository
  constructor() {
    this.repository = new CategoryRepository()
  }

  async create(dto: CreateCategoryDTO): Promise<ListCategoryType> {
    const obj = dto.getAll()
    const newCategory = await this.repository.create(obj)
    return new ListCategoryDTO(newCategory).getAll()
  }

  async alter(id: number, dto: UpdateCategoryDTO): Promise<void> {
    const obj = dto.getAll()
    await this.listById(id)
    await this.repository.alter(id, obj)
  }

  async delete(id: number): Promise<void> {
    await this.listById(id)
    await this.repository.delete(id)
  }

  async listById(id: number): Promise<ListCategoryType> {
    const obj = await this.repository.listById(id)

    if (!obj) {
      throw new AppError('Object not found', 404)
    }

    return new ListCategoryDTO(obj).getAll()
  }

  async listAll(filter?: FilterCategoryDTO): Promise<ListCategoriesType> {
    const objs = await this.repository.listAll(filter?.getAll())
    return objs
  }
}