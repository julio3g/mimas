import { prisma } from '@database/prismaClient';

export class DeleteToolImageUseCase {
  async execute(id: string) {
    const image = await prisma.toolsImage.delete({ where: { id } });
    return image;
  }
}
