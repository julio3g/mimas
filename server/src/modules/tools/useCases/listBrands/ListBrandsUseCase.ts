import { prisma } from '@database/prismaClient';

export class ListBrandsUseCase {
  async execute() {
    const brands = await prisma.brands.findMany();
    return brands;
  }
}
