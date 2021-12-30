import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository';

class SpecificationRespository implements ISpecificationRepository {
  private specification: Specification[];

  constructor() {
    this.specification = [];
  }

  create({ description, name }: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specification.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specification.find(
      specification => specification.name === name,
    );

    return specification;
  }
}

export { SpecificationRespository };
