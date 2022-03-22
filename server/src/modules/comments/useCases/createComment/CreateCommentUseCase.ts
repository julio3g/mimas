import { ICommentDTO } from '@modules/comments/dtos/ICommentDTO';
import { prisma } from '@database/prismaClient';

export class CreateCommentUseCase {
  async execute({ user_id, comment, tool_id }: ICommentDTO) {
    const createComment = await prisma.comments.create({
      data: {
        comment,
        user_id,
        tool_id,
      },
    });
    return createComment;
  }
}
