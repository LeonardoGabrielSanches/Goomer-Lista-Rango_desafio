import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import ProductController from '../controllers/ProductController';
import UploadProductImageController from '../controllers/UploadProductImageController';

const productsRouter = Router();
const productController = new ProductController();
const uploadProductImageController = new UploadProductImageController();

const upload = multer(uploadConfig);

productsRouter.get('/', productController.show);

productsRouter.get('/:id', productController.index);

productsRouter.post('/', productController.create);

productsRouter.put('/:id', productController.update);

productsRouter.delete('/:id', productController.delete);

productsRouter.patch(
  '/upload/:id',
  upload.single('image'),
  uploadProductImageController.upload,
);

export default productsRouter;
