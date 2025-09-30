import Category from '../models/category.model';
import { CategoryRepository } from '../repositories/cotegory.repository';
import { BaseService } from './base.service';

export class CategoryService extends BaseService<Category> {
  constructor() {
    super(new CategoryRepository())
  }
}