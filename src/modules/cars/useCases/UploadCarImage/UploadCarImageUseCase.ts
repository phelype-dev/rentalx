import { inject, injectable } from 'tsyringe';
import { IcarImagesRepository } from '@modules/cars/repositories/IcarImagesRepository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImagesRepository: IcarImagesRepository,
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImageUseCase };
