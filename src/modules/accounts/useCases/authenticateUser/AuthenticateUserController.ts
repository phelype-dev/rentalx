import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUseUseCase } from './AuthenticateUseUseCase';

class AuthenticateUserController {
  async handle(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { password, email } = request.body;

    const authenticateUseUserUseCase = container.resolve(
      AuthenticateUseUseCase,
    );

    const token = await authenticateUseUserUseCase.execute({
      password,
      email,
    });

    return response.json(token);
  }
}

export { AuthenticateUserController };
