import { AppError } from '@shared/errors/AppError';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  //Teste para salvar Categoria no Banco em Memoria//
  it('should be able to create new category', async () => {
    const category = {
      name: 'newCategory',
      description: 'newCategoryDescrition',
    };

    await createCategory.execute({
      name: category.name,
      description: category.description,
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );
    expect(categoryCreated).toHaveProperty('id');
  });

  //Teste //
  it('should not be able to create new category with same name exists', () => {
    expect(async () => {
      const category = {
        name: 'newCategory',
        description: 'newCategoryDescrition',
      };

      await createCategory.execute({
        name: category.name,
        description: category.description,
      });
      await createCategory.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
