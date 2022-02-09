import { Cars } from '../infra/typeorm/entities/Cars';

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

interface ICarRepository {
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Cars>;
  findByLicensePlate(license_plate: string): Promise<Cars>;
}

export { ICarRepository };
