import { ICarRepository } from '@modules/cars/repositories/ICarRepository';
import { container } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationRespository } from '@modules/cars/infra/typeorm/repositories/SpecificationRepository';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRespository',
  SpecificationRespository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UserRepository,
);

container.registerSingleton<ICarRepository>('CarsRepository', CarsRepository);
