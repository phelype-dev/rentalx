import { CreateCarController } from '@modules/cars/useCases/createCars/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/createCarSpecificationController';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCar/ListAvailableCarContoller';
import { UploadCarImagesController } from '@modules/cars/useCases/UploadCarImage/UploadCarImagesController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import uploadConfig from '../../../../config/upload';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarControllers = new ListAvailableCarController();
const createCarSpecificationController =
  new CreateCarSpecificationController();
const uploadCarsImageController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarControllers.handle);

carsRoutes.post(
  '/specification/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarsImageController.handle,
);

export { carsRoutes };
