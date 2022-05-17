import { prisma } from '@database/prismaClient';
export class DeleteCommentUseCase {
  async execute(id: string) {
    return await prisma.comments.delete({ where: { id } });
  }
}
