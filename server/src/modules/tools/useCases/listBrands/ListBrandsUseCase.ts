import { prisma } from '@database/prismaClient';
export class ListBrandsUseCase {
  async execute() {
    return await prisma.brands.findMany({ orderBy: { name: 'asc' } });
  }
}
