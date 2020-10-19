import path from 'path';
import fs from 'fs';
import { differenceInMinutes, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '../../../config/upload';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import Operation from '../../operations/typeorm/entities/Operation';
import Restaurant from '../typeorm/entities/Restaurant';

interface IRequest {
  id: number;
  name: string;
  address: string;
  image: string;
  operations: Operation[];
}

@injectable()
class UpdateRestaurantService {
  constructor(
    @inject('Nome1')
    private restaurantsRepository: IRestaurantsRepository,
    @inject('Nome2')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Restaurant> {
    const operationData: Operation[] = data.operations;

    const restaurant = await this.restaurantsRepository.getById(data.id);

    if (!restaurant) throw new Error('Restaurante não cadastrado');

    if (operationData.length <= 0)
      throw new Error('Deve haver um horário de funcionamento');

    operationData.forEach(operation => {
      const dateValid = isBefore(
        operation.opening_hour,
        operation.closing_hour,
      );

      if (!dateValid) throw new Error('O intervalo de horário deve ser válido');

      const totalHoursOpen = differenceInMinutes(
        operation.closing_hour,
        operation.opening_hour,
      );

      if (totalHoursOpen < 15)
        throw new Error(
          'O horário de funcionamento do estabelecimento deve ser de no minimo 15 minutos',
        );
    });

    operationData.forEach(async operation => {
      const operationDatabase = await this.operationsRepository.findById(
        operation.id,
      );

      if (operationDatabase) {
        operationDatabase.opening_hour = operation.opening_hour;
        operationDatabase.closing_hour = operation.closing_hour;
        operationDatabase.days = operation.days;

        this.operationsRepository.update(operationDatabase);
      }
    });

    const restaurantFilePath = path.join(uploadConfig.directory, data.image);

    const restaurantImageAlreadyExists = await fs.promises.stat(
      restaurantFilePath,
    );

    if (restaurantImageAlreadyExists)
      await fs.promises.unlink(restaurantFilePath);

    restaurant.name = data.name;
    restaurant.address = data.address;
    restaurant.image = restaurantFilePath;

    await this.restaurantsRepository.update(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantService;
