import { inject, injectable } from 'tsyringe';

import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRespository')
    private specificationRespository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRespository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    await this.specificationRespository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
