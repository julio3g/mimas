import { prisma } from '@database/prismaClient';
import { ICommentDTO } from '@modules/comments/dtos/ICommentDTO';
export class UpdateCommentUseCase {
  async execute({ id, comment, tool_id }: ICommentDTO) {
    const comments = await prisma.comments.findFirst({ where: { id } });
    comments.comment = comment ? comment : comments.comment;
    comments.tool_id = tool_id ? tool_id : comments.tool_id;
    await prisma.comments.update({ where: { id }, data: { comment } });
  }
}
