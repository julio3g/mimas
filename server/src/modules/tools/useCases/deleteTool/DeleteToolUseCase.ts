import { prisma } from '@database/prismaClient';

export class DeleteToolUseCase {
  async execute(id: string) {
    const tool = await prisma.tools.delete({ where: { id } });
    return tool;
  }
}
