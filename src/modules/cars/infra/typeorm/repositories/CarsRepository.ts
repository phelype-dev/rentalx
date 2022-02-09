import { getRepository, Repository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { Cars } from '../entities/Cars';

class CarsRepository implements ICarRepository {
  private repository: Repository<Cars>;
  constructor() {
    this.repository = getRepository(Cars);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Cars> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Cars> {
    const car = await this.repository.findOne(license_plate);
    return car;
  }
}

export { CarsRepository };
