import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
export class CreateBrandUseCase {
  async execute(name: string) {
    const brandAlreadyExists = await prisma.brands.findFirst({
      where: { name },
    });
    if (brandAlreadyExists) throw new AppError('Brand already exists!');
    const brand = await prisma.brands.create({ data: { name } });
    return brand;
  }
}
