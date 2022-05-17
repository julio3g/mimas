import { prisma } from '@database/prismaClient';
export class DeleteToolUseCase {
  async execute(id: string) {
    return await prisma.tools.delete({ where: { id } });
  }
}
