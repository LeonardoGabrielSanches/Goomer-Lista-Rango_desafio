import { Router } from 'express';
import restaurantsRoutes from '../../../../modules/restaurants/http/routes/restaurants.routes';

const routes = Router();

routes.use('/restaurants', restaurantsRoutes);

export default routes;
