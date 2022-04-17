import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { SpecificationInMemory } from '@modules/cars/repositories/in-memory/SpecificationInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationInMemory;

describe('Create car specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new car specification to a now-existing car', () => {
    expect(async () => {
      const car_id = '1234';
      const specification_id = ['3453454'];

      await createCarSpecificationUseCase.execute({ car_id, specification_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new car specification', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'A3',
      description: 'Sedão luxo',
      daily_rate: 200,
      license_plate: 'ABD-1222',
      fine_amount: 100,
      brand: 'Audi',
      category_id: 'category',
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: 'Teste',
      name: 'Test',
    });
    const specification_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_id,
    });
    expect(specificationCars).toHaveProperty('specifications');
    expect(specificationCars.specifications.length).toBe(1);
  });
});
