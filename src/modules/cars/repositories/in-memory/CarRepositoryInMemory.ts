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
    id,
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
      id,
    });

    this.cars.push(cars);
    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Cars> {
    return this.cars.find(cars => cars.license_plate === license_plate);
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string,
  ): Promise<Cars[]> {
    const cars = this.cars.filter(cars => {
      if (
        cars.available === true ||
        (brand && cars.brand === brand) ||
        (category_id && cars.category_id === category_id) ||
        (name && cars.name === name)
      ) {
        return cars;
      }
      return null;
    });
    return cars;
  }

  async findById(id: string): Promise<Cars> {
    return await this.cars.find(cars => cars.id === id);
  }
}

export { CarRepositoryInMemory };
