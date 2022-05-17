import { prisma } from '@database/prismaClient';
import { IUsingDTO } from '@modules/using/dtos/IUsingDTO';
export class CreateUsingUseCase {
  async execute({ tool_id, user_id }: IUsingDTO) {
    const using = await prisma.using.create({
      data: { tool_id, user_id },
    });
    await prisma.tools.update({
      where: { id: tool_id },
      data: { available: false },
    });
    return using;
  }
}
