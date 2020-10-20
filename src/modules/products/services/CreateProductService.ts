import { inject, injectable } from 'tsyringe';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import ICategoriesRepository from '../../categories/repositories/ICategoriesRepository';

import validateDate from '../../utils/DateHelper';

import Product from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  category: string;
  promotion: boolean;
  promotion_description?: string;
  promotion_price?: number;
  restaurant_id: number;
  // eslint-disable-next-line no-use-before-define
  operations?: IRequestOperation[];
}

interface IRequestOperation {
  start_hour: string;
  end_hour: string;
  period_description: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    restaurant_id,
    operations,
    name,
    price,
    promotion,
    promotion_description,
    promotion_price,
    category,
  }: IRequest): Promise<Product> {
    const restaurant = await this.restaurantsRepository.getById(restaurant_id);

    if (!restaurant) throw new Error('Restaurante não cadastrado');

    if (promotion) {
      const operationData: IRequestOperation[] = operations ?? [];

      if (operationData.length <= 0)
        throw new Error(
          'Deve haver um horário para o funcionamento da promoção',
        );

      operationData.forEach(operation => {
        validateDate(operation.start_hour, operation.end_hour);
      });
    }

    let categoryDatabase;

    categoryDatabase = await this.categoriesRepository.findByName(category);

    if (!categoryDatabase)
      categoryDatabase = await this.categoriesRepository.create({ name });

    const product = await this.productsRepository.create({
      name,
      price,
      promotion,
      promotion_description,
      promotion_price,
      restaurant,
      category: categoryDatabase,
    });

    if (operations)
      operations.forEach(async operation => {
        await this.operationsRepository.create({
          start_hour: operation.start_hour,
          end_hour: operation.end_hour,
          period_description: operation.period_description,
          product,
        });
      });

    return product;
  }
}

export default CreateProductService;
