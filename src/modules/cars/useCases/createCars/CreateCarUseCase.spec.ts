import { AppError } from './../../../../shared/errors/AppError';
import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarRepositoryInMemory;

describe('Create Cars', () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('Should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Civic',
      description: 'Sedão médio. ',
      daily_rate: 700,
      license_plate: 'RFS1A87',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a new cars with exists license_plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Civic',
        description: 'Sedão médio. ',
        daily_rate: 700,
        license_plate: 'RFS1A87',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Civics',
        description: 'Sedão médio. ',
        daily_rate: 700,
        license_plate: 'RFS1A87',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new cars with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Civic',
      description: 'Sedão médio. ',
      daily_rate: 700,
      license_plate: 'RFS1A89',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
    expect(car.available).toBe(true);
  });
});
