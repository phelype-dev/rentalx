import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCar/ListAvailableCarContoller';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarControllers = new ListAvailableCarController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarControllers.handle);

export { carsRoutes };
