import { prisma } from '@database/prismaClient';

export class DeleteCommentUseCase {
  async execute(id: string) {
    const comment = await prisma.comments.delete({
      where: { id },
    });
    return comment;
  }
}
