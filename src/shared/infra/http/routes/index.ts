import { Router } from 'express';
import restaurantsRoutes from '../../../../modules/restaurants/http/routes/restaurants.routes';
import productsRoutes from '../../../../modules/products/http/routes/products.routes';

const routes = Router();

routes.use('/restaurants', restaurantsRoutes);
routes.use('/products', productsRoutes);

export default routes;
