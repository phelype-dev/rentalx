import { CarImage } from '../infra/typeorm/entities/CarImage';

interface IcarImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}

export { IcarImagesRepository };
