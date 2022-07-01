import { inject, injectable } from 'tsyringe';
import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarRepository,
  ) {}

  async execute({
    brand,
    category_id,
    name,
  }: IRequest): Promise<Cars[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name,
    );
    return cars;
  }
}

export { ListAvailableCarUseCase };
