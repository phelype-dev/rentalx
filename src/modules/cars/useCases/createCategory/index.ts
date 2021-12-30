import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategoryUseCase } from '../createCategory/CreateCategoryUseCase';
import { CreateCategoryController } from './createCategoryController';

//const categoryRepository = CategoriesRepository.getInstance();

export default () => {
  const categoryRepository = new CategoriesRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
  );

  return createCategoryController;
};
