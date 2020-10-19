import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import RestaurantController from '../controllers/RestaurantsController';

const restaurantRouter = Router();
const restaurantController = new RestaurantController();

const upload = multer(uploadConfig);

restaurantRouter.post('/', restaurantController.create);

restaurantRouter.put('/', upload.single('image'), restaurantController.update);

export default restaurantRouter;
