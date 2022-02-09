import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/createUserUseCase';
import { AuthenticateUseUseCase } from './AuthenticateUseUseCase';

let authenticateUserUseCase: AuthenticateUseUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUseUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it('Should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '01010101',
      email: 'test@example.com',
      password: 'test',
      name: 'test',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able toauthenticate an no exists user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'otheremail@exemple.com',
        password: '1232233',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '01010101',
        email: 'test@example.com',
        password: 'test',
        name: 'test',
      };
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
