import { inject, injectable } from 'tsyringe';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IProductsRepository from '../repositories/IProductsRepository';

import validateDate from '../../utils/DateHelper';

import Product from '../typeorm/entities/Product';
import IRestaurantsRepository from '../../restaurants/repositories/IRestaurantsRepository';
import ICategoriesRepository from '../../categories/repositories/ICategoriesRepository';

interface IRequest {
  id: number;
  name: string;
  price: number;
  category: string;
  sale: boolean;
  sale_description?: string;
  sale_price?: number;
  restaurant_id: number;
  // eslint-disable-next-line no-use-before-define
  operations?: IRequestOperation[];
}

interface IRequestOperation {
  id?: number;
  start_hour: string;
  end_hour: string;
  period_description: string;
}

@injectable()
class UpdateProductService {
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
    id,
    name,
    price,
    category,
    sale,
    sale_description,
    sale_price,
    restaurant_id,
    operations,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.getById(id);

    if (!product) throw new Error('Produto não cadastrado');

    const restaurant = await this.restaurantsRepository.getById(restaurant_id);

    if (!restaurant) throw new Error('Restaurante não cadastrado');

    if (sale) {
      const operationData: IRequestOperation[] = operations ?? [];

      if (operationData.length <= 0)
        throw new Error('Deve haver um horário de funcionamento');

      operationData.forEach(operation => {
        validateDate(operation.start_hour, operation.end_hour);
      });

      operationData.forEach(async operation => {
        if (operation.id) {
          const operationDatabase = await this.operationsRepository.findById(
            operation.id,
          );

          if (operationDatabase) {
            operationDatabase.start_hour = operation.start_hour;
            operationDatabase.end_hour = operation.end_hour;
            operationDatabase.period_description = operation.period_description;

            await this.operationsRepository.update(operationDatabase);
          }
        } else {
          await this.operationsRepository.create({
            start_hour: operation.start_hour,
            end_hour: operation.end_hour,
            period_description: operation.period_description,
            product,
          });
        }
      });
    }

    let categoryDatabase = await this.categoriesRepository.findByName(category);

    if (!categoryDatabase)
      categoryDatabase = await this.categoriesRepository.create({
        name: category,
      });

    Object.assign(product, {
      name,
      price,
      sale,
      sale_description,
      sale_price,
      operations,
      category: categoryDatabase,
    });

    const productResponse = await this.productsRepository.update(product);

    Object.assign(productResponse, {
      image: productResponse.image
        ? `http://localhost:3333/uploads/${productResponse.image}`
        : null,
    });

    return productResponse;
  }
}

export default UpdateProductService;
