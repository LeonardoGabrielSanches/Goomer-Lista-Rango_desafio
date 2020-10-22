import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRestaurantService from '../../services/CreateRestaurantService';
import DeleteRestaurantService from '../../services/DeleteRestaurantService';
import UpdateRestaurantService from '../../services/UpdateRestaurantService';

import RestaurantsRepository from '../../typeorm/repositories/RestaurantsRepository';

export default class RestaurantController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const restaurantsRepository = container.resolve(RestaurantsRepository);

    const restaurant = await restaurantsRepository.getById(id);

    if (!restaurant) return response.status(204).send();

    return response.json(classToClass(restaurant));
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
    const { id, name, address, operations } = request.body;

    const updateRestaurant = container.resolve(UpdateRestaurantService);

    const restaurant = await updateRestaurant.execute({
      id,
      name,
      address,
      operations,
    });

    return response.json(restaurant);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRestaurant = container.resolve(DeleteRestaurantService);

    await deleteRestaurant.execute(id);

    return response.status(204).send();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const restaurantsRepository = container.resolve(RestaurantsRepository);

    const restaurants = await restaurantsRepository.getAll();

    if (restaurants.length <= 0) return response.status(204).send();

    return response.json(restaurants);
  }
}
