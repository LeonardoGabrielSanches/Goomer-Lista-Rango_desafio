import { inject, injectable } from 'tsyringe';
import { differenceInMinutes, isBefore } from 'date-fns';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import Restaurant from '../typeorm/entities/Restaurant';

interface IRequest {
  name: string;
  address: string;
  // eslint-disable-next-line no-use-before-define
  operations: IRequestOperation[];
}

interface IRequestOperation {
  opening_hour: string;
  closing_hour: string;
  days: string;
}

@injectable()
class CreateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantRepository: IRestaurantsRepository,
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Restaurant> {
    const operationData: IRequestOperation[] = data.operations;

    if (operationData.length <= 0)
      throw new Error('Deve haver um horário de funcionamento');

    operationData.forEach(operation => {
      const [openingHour, openingMinutes] = operation.opening_hour.split(':');
      const [closingHour, closingMinutes] = operation.closing_hour.split(':');

      const parsedOpeningHour = new Date().setHours(
        Number.parseInt(openingHour, 10),
        Number.parseInt(openingMinutes, 10),
      );

      const parsedClosingHour = new Date().setHours(
        Number.parseInt(closingHour, 10),
        Number.parseInt(closingMinutes, 10),
      );

      const dateValid = isBefore(parsedOpeningHour, parsedClosingHour);

      if (!dateValid) throw new Error('O intervalo de horário deve ser válido');

      const totalMinutesOpen = differenceInMinutes(
        parsedClosingHour,
        parsedOpeningHour,
      );

      if (totalMinutesOpen < 15)
        throw new Error(
          'O horário de funcionamento do estabelecimento deve ser de no minimo 15 minutos',
        );
    });

    const restaurant = await this.restaurantRepository.create({
      name: data.name,
      address: data.address,
    });

    operationData.forEach(async operation => {
      await this.operationsRepository.create({
        opening_hour: operation.opening_hour,
        closing_hour: operation.closing_hour,
        days: operation.days,
        restaurant,
      });
    });

    return restaurant;
  }
}

export default CreateRestaurantService;
