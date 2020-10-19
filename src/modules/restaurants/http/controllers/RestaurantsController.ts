import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRestaurantService from '../../services/CreateRestaurantService';
import DeleteRestaurantService from '../../services/DeleteRestaurantService';
import UpdateRestaurantService from '../../services/UpdateRestaurantService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, address, operations } = request.body;
    console.log(operations);
    const createRestaurant = container.resolve(CreateRestaurantService);

    const restaurant = await createRestaurant.execute({
      name,
      address,
      image: request.file.filename,
      operations,
    });

    return response.json(restaurant);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, address, operations } = request.body;

    const updateRestaurant = container.resolve(UpdateRestaurantService);

    const restaurant = await updateRestaurant.execute({
      id,
      name,
      address,
      image: request.file.filename,
      operations,
    });

    return response.json(restaurant);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRestaurant = container.resolve(DeleteRestaurantService);

    // eslint-disable-next-line radix
    const idNumber = parseInt(id);

    const restaurant = await deleteRestaurant.execute(idNumber);

    return response.json(restaurant);
  }
}
