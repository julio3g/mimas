import { prisma } from '@database/prismaClient';
import { AppError } from '@shared/errors/AppError';
import { IToolDTO } from '@modules/tools/dtos/IToolDTO';

export class CreateToolUseCase {
  async execute({ name, amount, brand_id }: IToolDTO) {
    const toolAlreadyExists = await prisma.tools.findFirst({ where: { name } });
    if (toolAlreadyExists) throw new AppError('Tool already exists!');
    const tool = await prisma.tools.create({
      data: { name, brand_id, amount },
    });
    return tool;
  }
}
