import { prisma } from '@database/prismaClient';
export class DeleteBrandUseCase {
  async execute(id: string) {
    return await prisma.brands.delete({ where: { id } });
  }
}
