import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Cars } from '../infra/typeorm/entities/Cars';

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Cars>;
  findByLicensePlate(license_plate: string): Promise<Cars>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Cars[]>;
}

export { ICarRepository };
