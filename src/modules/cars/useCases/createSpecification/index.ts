import { SpecificationRespository } from '../../repositories/implementations/SpecificationRepository';
import { CreateSpecificationController } from './createSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationRespository = new SpecificationRespository();
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRespository,
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };
