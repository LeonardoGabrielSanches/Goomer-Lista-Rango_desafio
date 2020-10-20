import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';

import ProductController from '../controllers/ProductController';

const productsRouter = Router();
const productController = new ProductController();

const upload = multer(uploadConfig);

productsRouter.post('/', productController.create);

export default productsRouter;
