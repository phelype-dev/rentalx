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
    specifications,
    id,
  }: ICreateCarDTO): Promise<Cars> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Cars> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Cars[]> {
    const carQuery = this.repository
      .createQueryBuilder('c')
      .where('c.available = :available', { available: true });

    if (brand) {
      carQuery.andWhere('c.brand = :brand', { brand });
    }
    if (category_id) {
      carQuery.andWhere('c.category_id = :category_id', { category_id });
    }
    if (name) {
      carQuery.andWhere('c.name = :name', { name });
    }

    const cars = await carQuery.getMany();

    return cars;
  }
  async findById(id: string): Promise<Cars> {
    const car = await this.repository.findOne(id);
    return car;
  }
}

export { CarsRepository };
