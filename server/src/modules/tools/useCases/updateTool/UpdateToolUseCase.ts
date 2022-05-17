import { prisma } from '@database/prismaClient';
import { IToolDTO } from '@modules/tools/dtos/IToolDTO';
export class UpdateToolUseCase {
  async execute({ id, name, amount, brand_id }: IToolDTO) {
    const tool = await prisma.tools.findFirst({ where: { id } });
    tool.name = name ? name : tool.name;
    tool.amount = amount ? amount : tool.amount;
    tool.brand_id = brand_id ? brand_id : tool.brand_id;
    await prisma.tools.update({
      where: { id },
      data: { name, amount, brand_id },
    });
  }
}
