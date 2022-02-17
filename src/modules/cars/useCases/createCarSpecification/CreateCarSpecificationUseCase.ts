import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  car_id: string;
  specification_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarRepository,
    @inject('SpecificationRespository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute({ car_id, specification_id }: IRequest): Promise<Cars> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exist');
    }

    const specifications = await this.specificationRepository.findByIds(
      specification_id,
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateCarSpecificationUseCase };
