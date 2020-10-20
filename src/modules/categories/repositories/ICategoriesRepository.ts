import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO';
import Category from '../typeorm/entities/Category';

interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  create(data: ICreateCategoryDTO): Promise<Category>;
}

export default ICategoriesRepository;
