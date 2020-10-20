import { inject, injectable } from 'tsyringe';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import validateDate from '../../utils/DateHelper';

import Restaurant from '../typeorm/entities/Restaurant';

interface IRequest {
  name: string;
  address: string;
  // eslint-disable-next-line no-use-before-define
  operations: IRequestOperation[];
}

interface IRequestOperation {
  start_hour: string;
  end_hour: string;
  period_description: string;
}

@injectable()
class CreateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantRepository: IRestaurantsRepository,
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute({
    name,
    address,
    operations,
  }: IRequest): Promise<Restaurant> {
    const operationData: IRequestOperation[] = operations;

    if (operationData.length <= 0)
      throw new Error('Deve haver um horário de funcionamento');

    operationData.forEach(operation => {
      validateDate(operation.start_hour, operation.end_hour);
    });

    const restaurant = await this.restaurantRepository.create({
      name,
      address,
    });

    operationData.map(async operation => {
      const createdOperation = await this.operationsRepository.create({
        start_hour: operation.start_hour,
        end_hour: operation.end_hour,
        period_description: operation.period_description,
        restaurant,
      });

      Object.assign(operation, { id: createdOperation.id });
    });

    Object.assign(restaurant, { operations: operationData });

    return restaurant;
  }
}

export default CreateRestaurantService;
