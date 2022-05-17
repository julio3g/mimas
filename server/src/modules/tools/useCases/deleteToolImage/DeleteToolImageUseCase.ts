import { prisma } from '@database/prismaClient';
export class DeleteToolImageUseCase {
  async execute(id: string) {
    return await prisma.toolsImage.delete({ where: { id } });
  }
}
