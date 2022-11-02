import AppDataSource from "../../data-source";
import Category from "../../entities/categories.entity";
import Property from "../../entities/properties.entity";
import AppError from "../../errors/AppError";

const listCategoryService = async (id: string) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const category = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export default listCategoryService;
