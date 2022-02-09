import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Cars } from '@modules/cars/infra/typeorm/entities/Cars';
import { ICarRepository } from '../ICarRepository';

class CarRepositoryInMemory implements ICarRepository {
  cars: Cars[] = [];
  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Cars> {
    const cars = new Cars();

    Object.assign(cars, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.cars.push(cars);
    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Cars> {
    return this.cars.find(cars => cars.license_plate === license_plate);
  }
}

export { CarRepositoryInMemory };
