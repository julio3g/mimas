import { io } from '@shared/infra/http/app';
import { prisma } from '@database/prismaClient';
import { ICommentDTO } from '@modules/comments/dtos/ICommentDTO';
export class CreateCommentUseCase {
  async execute({ user_id, comment, tool_id }: ICommentDTO) {
    const createComment = await prisma.comments.create({
      data: {
        comment,
        user_id,
        tool_id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    const infoWS = {
      text: createComment.comment,
      user_id: createComment.user_id,
      created_at: createComment.created_at,
      user: {
        name: createComment.user.name,
      },
    };
    io.emit('new_comment', infoWS);
    return createComment;
  }
}
