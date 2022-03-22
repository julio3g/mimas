import { prisma } from '@database/prismaClient';

export class DeleteBrandUseCase {
  async execute(id: string) {
    const brand = await prisma.brands.delete({ where: { id } });
    return brand;
  }
}
