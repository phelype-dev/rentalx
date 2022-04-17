import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private catetoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.catetoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError(`Category ${name} already exists`);
    }

    await this.catetoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
