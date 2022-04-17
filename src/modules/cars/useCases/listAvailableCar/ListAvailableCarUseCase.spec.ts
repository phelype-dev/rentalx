import { CarRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

let listCarUseCase: ListAvailableCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarUseCase = new ListAvailableCarUseCase(carRepositoryInMemory);
  });

  it('Should be able to list all available cars', async () => {
    const car = await carRepositoryInMemory.create({
      name: '320i',
      description: 'Sedão Luxo',
      daily_rate: 300.0,
      fine_amount: 1000,
      brand: 'BMW',
      category_id: 'category_id',
      license_plate: 'ABC-1204',
    });

    const cars = await listCarUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by brand', async () => {
    const car = await carRepositoryInMemory.create({
      name: '320i',
      description: 'Sedão Luxo',
      daily_rate: 300.0,
      fine_amount: 1000,
      brand: 'BMW_1',
      category_id: 'category_id',
      license_plate: 'ABC-1204',
    });
    const cars = await listCarUseCase.execute({
      brand: 'BMW_1',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by name', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'C180',
      description: 'Sedão Luxo',
      daily_rate: 300.0,
      fine_amount: 1000,
      brand: 'Mercedes',
      category_id: 'category_id',
      license_plate: 'ABC-1205',
    });
    const cars = await listCarUseCase.execute({
      name: 'C180',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list available cars by category', async () => {
    const car = await carRepositoryInMemory.create({
      name: 'C250',
      description: 'Sedão Luxo',
      daily_rate: 300.0,
      fine_amount: 1000,
      brand: 'Mercedes',
      category_id: 'category_id',
      license_plate: 'ABC-1205',
    });
    const cars = await listCarUseCase.execute({
      category_id: 'category_id',
    });

    expect(cars).toEqual([car]);
  });
});
