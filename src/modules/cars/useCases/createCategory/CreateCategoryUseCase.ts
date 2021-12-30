import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private catetoriesRepository: ICategoriesRepository) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.catetoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new Error(`Category ${name} already exists`);
    }

    this.catetoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
