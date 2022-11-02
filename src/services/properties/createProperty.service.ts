import AppDataSource from "../../data-source";
import Address from "../../entities/addresses.entity";
import Category from "../../entities/categories.entity";
import Property from "../../entities/properties.entity";
import AppError from "../../errors/AppError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async ({
  address,
  categoryId,
  size,
  value,
}: IPropertyRequest): Promise<any> => {
  const propertyRepository = AppDataSource.getRepository(Property);
  const categoryRepository = AppDataSource.getRepository(Category);
  const addressRepository = AppDataSource.getRepository(Address);

  const propertyFind = await propertyRepository.findOne({
    where: { address: address },
  });

  if (address.zipCode.length > 8 || address.state.length > 2) {
    throw new AppError("Invalid zip or State", 400);
  }

  if (propertyFind) {
    throw new AppError("Property is already registred", 400);
  }

  const category = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const newProperty = {
    size,
    value,
    category: category,
  };

  const property = propertyRepository.create(newProperty);
  await propertyRepository.save(property);

  const newAddress = addressRepository.create({ ...address });
  await addressRepository.save(newAddress);
  await propertyRepository.update(property.id, {
    address: newAddress,
  });

  const response = await propertyRepository.findOne({
    where: { id: property.id },
  });

  return response;
};

export default createPropertyService;
