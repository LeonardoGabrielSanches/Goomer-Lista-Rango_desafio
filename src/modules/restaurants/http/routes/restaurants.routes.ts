import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import RestaurantController from '../controllers/RestaurantController';
import UploadRestaurantImageController from '../controllers/UploadRestaurantImageController';

const restaurantRouter = Router();
const restaurantController = new RestaurantController();
const uploadRestaurantImageController = new UploadRestaurantImageController();

const upload = multer(uploadConfig);

restaurantRouter.get('/', restaurantController.index);

restaurantRouter.get('/:id', restaurantController.show);

restaurantRouter.post('/', restaurantController.create);

restaurantRouter.put('/', restaurantController.update);

restaurantRouter.delete('/:id', restaurantController.delete);

restaurantRouter.patch(
  '/upload/:id',
  upload.single('image'),
  uploadRestaurantImageController.upload,
);

export default restaurantRouter;
