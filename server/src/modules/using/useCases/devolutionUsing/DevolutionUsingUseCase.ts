import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { IUsingDTO } from '@modules/using/dtos/IUsingDTO';

export class DevolutionUsingUseCase {
  async execute({ id, user_id }: IUsingDTO) {
    const using = await prisma.using.findFirst({ where: { id } });
    const tool = await prisma.tools.findFirst({ where: { id: using.tool_id } });
    if (!using) throw new AppError("Using doesn't exists!");
    const deleteUsing = await prisma.using.delete({ where: { id } });
    await prisma.tools.update({
      where: { id: tool.id },
      data: { available: true },
    });
    return deleteUsing;
  }
}
