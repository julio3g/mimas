import { ICommentDTO } from '@modules/comments/dtos/ICommentDTO';
import { prisma } from '@database/prismaClient';

export class UpdateCommentUseCase {
  async execute({ id, comment }: ICommentDTO) {
    const comments = await prisma.comments.findFirst({ where: { id } });
    comments.comment = comment ? comment : comments.comment;
    await prisma.comments.update({ where: { id }, data: { comment } });
  }
}
