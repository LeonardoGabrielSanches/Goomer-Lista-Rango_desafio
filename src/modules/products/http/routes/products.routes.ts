import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import ProductController from '../controllers/ProductController';
import UploadProductImageController from '../controllers/UploadProductImageController';

const productsRouter = Router();
const productController = new ProductController();
const uploadProductImageController = new UploadProductImageController();

const upload = multer(uploadConfig);

productsRouter.get('/', productController.showByRestaurant);

productsRouter.get('/:id', productController.show);

productsRouter.post('/', productController.create);

productsRouter.put('/', productController.update);

productsRouter.delete('/:id', productController.delete);

productsRouter.patch(
  '/upload/:id',
  upload.single('image'),
  uploadProductImageController.upload,
);

export default productsRouter;
