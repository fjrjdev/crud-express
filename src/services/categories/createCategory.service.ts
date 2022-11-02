import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import AppError from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<Category> => {
  const categoryRepository = AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOne({ where: { name: name } });
  if (category) {
    throw new AppError("This category is already registred", 400);
  }
  const newCategory = categoryRepository.create({
    name: name,
  });

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
