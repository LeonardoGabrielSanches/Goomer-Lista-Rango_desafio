import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRestaurantService from '../../services/CreateRestaurantService';
import DeleteRestaurantService from '../../services/DeleteRestaurantService';
import UpdateRestaurantService from '../../services/UpdateRestaurantService';

import RestaurantsRepository from '../../typeorm/repositories/RestaurantsRepository';

export default class RestaurantController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const idNumber = parseInt(id, 10);

    const restaurantsRepository = container.resolve(RestaurantsRepository);

    const restaurant = await restaurantsRepository.getById(idNumber);

    return response.json(restaurant);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address, operations } = request.body;

    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      address,
      operations,
    });

    return response.status(201).json(restaurant);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, address, operations } = request.body;

    const updateRestaurant = container.resolve(UpdateRestaurantService);

    const idNumber = parseInt(id, 10);

    const restaurant = await updateRestaurant.execute({
      id: idNumber,
      name,
      address,
      operations,
    });

    return response.json(restaurant);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRestaurant = container.resolve(DeleteRestaurantService);

    const idNumber = parseInt(id, 10);

    await deleteRestaurant.execute(idNumber);

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const restaurantsRepository = container.resolve(RestaurantsRepository);

    const restaurants = await restaurantsRepository.getAll();

    return response.json(restaurants);
  }
}
