import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response: Promise<Response>) {
    const { name, description } = request.body;
    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase,
    );
    await createSpecificationUseCase.execute({ name, description });

    return (await response).status(201).send();
  }
}

export { CreateSpecificationController };
